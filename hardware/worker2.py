from machine import Pin, I2C, ADC, PWM
from time import sleep
import ubinascii
import espnow
import network

# ESP NOW CODE lines 10-23

# # A WLAN interface must be active to send()/recv()
# sta = network.WLAN(network.STA_IF)  # Or network.AP_IF
# sta.active(True)
# sta.disconnect()      # For ESP8266
# 
# e = espnow.ESPNow()
# e.active(True)
# peer = b'\xcc\xdb\xa7\x56\x3e\x00'   # MAC address of peer's wifi interface
# e.add_peer(peer)      # Must add_peer() before send()
# 
# e.send(peer, "Starting...")
# for i in range(100):
#     e.send(peer, str(i)*20, True)
# e.send(peer, b'end')


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
    {"name": "MQ4", "port": 27, "limit": 1500},
    {"name": "MQ135", "port": 12, "limit": 1300},
    {"name": "MQ6", "port": 14, "limit": 850},
    {"name": "MQ9", "port": 26, "limit": 1200},
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

while True:
    limit_exceeded = False

    for sensor in mq_sensors:
        value = sensor["object"].read()
        if value > sensor["limit"]:
            print(f"WARNING: {sensor['name']} exceeded limit of {sensor['limit']} (value of {value})")
            limit_exceeded = True
        else:
            print(f"{sensor['name']} has a value of {value}")

    buzzer.value(int(limit_exceeded))          
    
    print("----------------------------------------------------------------------------------")
    sleep(1)


