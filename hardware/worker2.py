from machine import Pin, I2C, ADC, PWM
from time import sleep, localtime, mktime
import ubinascii
import espnow
import network
import json
# ESP NOW CODE lines 10-23

sta = network.WLAN(network.STA_IF)  # Or network.AP_IF
sta.active(True)
sta.disconnect()  # For ESP8266

e = espnow.ESPNow()
e.active(True)
peer = b"\xcc\xdb\xa7\x55\x27\x1c"  # MAC address of Master's wifi interface
e.add_peer(peer)  # Must add_peer() before send()

print("Connected to Master Successfully!")


# ESP32 - Pin assignment

# Onboard LED
led = Pin(2, Pin.OUT)
led.value(0)

# Buzzer setup
buzzer = Pin(13, Pin.OUT)
buzzer.value(0)

# Button

button = Pin(25, Pin.IN)


# # MQ2 object creation
# mq2 = ADC(Pin(13))
# mq2.width(ADC.WIDTH_12BIT)
# mq2.atten(ADC.ATTN_11DB)


# https://docs.google.com/document/d/1b6RnRh9VyQ-11lCJTDsWovuk9PmV7vqPXaFdh5WmDn0/edit
mq_sensors = [
    {"name": "MQ4", "port": 27, "limit": 4000},
    {"name": "MQ135", "port": 12, "limit": 2000},
    {"name": "MQ6", "port": 14, "limit": 3500},
    {"name": "MQ9", "port": 26, "limit": 2500},
]

for sensor in mq_sensors:
    sensor["object"] = ADC(Pin(sensor["port"]))
    sensor["object"].width(ADC.WIDTH_12BIT)
    sensor["object"].atten(ADC.ATTN_11DB)


# wait = 300
# led.value(1)
# try:
#     for second in range(300):
#         print(f"{wait - second} seconds left until sensors are done heating up.")
#         print(button.value())
#         if button.value() == 1:
#             raise KeyboardInterrupt
#         sleep(1)
# except KeyboardInterrupt:
#     print("Skipping heating process.")
# led.value(0)

from_worker_1 = None

while True:
    limit_exceeded = False

    if e.any():
        from_worker_1 = e.recv()

    data = {
      "mac_address": ubinascii.hexlify(network.WLAN().config('mac'),':').decode(),
      "time": int(mktime(localtime())),
      "panic_flag": "None",
      "sensors": {}
    }

    for sensor in mq_sensors:
        value = sensor["object"].read()
        if value > sensor["limit"]:
            print(f"WARNING: {sensor['name']} exceeded limit of {sensor['limit']} (value of {value})")
            limit_exceeded = True
        else:
            print(f"{sensor['name']} has a value of {value}")
        
        data["sensors"][sensor["name"]] = value

    if from_worker_1 is not None and from_worker_1["panic_flag"] != "None":
        limit_exceeded = True
        data["panic_flag"] = from_worker_1["panic_flag"]
    elif limit_exceeded:
      data["panic_flag"] = data["mac_address"]

    buzzer.value(int(limit_exceeded))

    print(json.dumps(data, indent=4))
    print(json.dumps(from_worker_1, indent=4))

    # Send data to Master
    if from_worker_1 is not None:
        e.send(peer, json.dumps([data, from_worker_1]))
    else:
        e.send(peer, json.dumps([data]))
    
    print("----------------------------------------------------------------------------------")
    sleep(1)

e.send(peer, "end")
