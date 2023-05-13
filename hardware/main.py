from machine import Pin, I2C, ADC
from time import sleep
import bme280
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

# I2C connection for weather sensor
weather_sensor = bme280.BME280(i2c=I2C(scl=Pin(22), sda=Pin(21), freq=10000))

# Buzzer setup
buzzer = Pin(15, Pin.OUT)
buzzer_level = 0


# MQ2 object creation
mq2 = ADC(Pin(13))
mq2.width(ADC.WIDTH_12BIT)
mq2.atten(ADC.ATTN_11DB)


while True:
    temp = weather_sensor.read_temperature()/100  # Temperature in degrees C
    hum = weather_sensor.read_humidity() / 1024  # Humidity in percent
    pres = weather_sensor.read_pressure() / 256 / 1000  # Pressure in kPa

    print('Temperature: ', temp)
    print('Humidity: ', hum)
    print('Pressure: ', pres)

    mq2_value = mq2.read()

    print('MQ2: ', mq2_value)

    limits = [(mq2, 1500)]
    limit_exceeded = False

    for sensor, limit in limits:
        if sensor.read() > limit:
            print('WARNING:', sensor, 'exceeded limit of ', limit, ', which has a threshold of ', limit )
            limit_exceeded = True

    if limit_exceeded:
        buzzer_level = 1
    else:
        buzzer_level = 0

    buzzer.value(buzzer_level)
    print('----------------------------------------------------------------------------------')
    sleep(1)
