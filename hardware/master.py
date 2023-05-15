from machine import Pin, I2C, ADC, PWM
from time import sleep, mktime, localtime
import ubinascii
import espnow
import network
import json
import urequests

url = "http://{IP_ADDRESS}:5000/update-0"
ssid = ""
password = ""

sta = network.WLAN(network.STA_IF)  # Or network.AP_IF
sta.active(True)
sta.disconnect()  # For ESP8266

e = espnow.ESPNow()
e.active(True)

def do_connect():
    import network
    sta_if = network.WLAN(network.STA_IF)
    if not sta_if.isconnected():
        print('connecting to network...')
        sta_if.active(True)
        sta_if.connect(ssid, password)
        while not sta_if.isconnected():
            pass
    print('network config:', sta_if.ifconfig())

do_connect()
print(urequests.get(url="http://192.168.115.236:5000/test").text)

from_worker_2 = []

while True:
    if e.any():
        from_worker_2 = e.recv()
      
    data = {
        "mac_address": ubinascii.hexlify(network.WLAN().config('mac'),':').decode(),
        "time": int(mktime(localtime())),
        "panic_flag": "None",
        "data": from_worker_2,
    }

    for worker in from_worker_2:
        if worker["panic_flag"]:
            data["panic_flag"] = worker["panic_flag"]

    print(data)

    urequests.post(url=url, data = data)

    print("----------------------------------------------------------------------------------")
    sleep(1)