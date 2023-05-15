from machine import Pin, I2C, ADC, PWM
from time import sleep
import ubinascii
import espnow
import network

import json


def worker1():
    sta = network.WLAN(network.STA_IF)  # Or network.AP_IF
    sta.active(True)
    sta.disconnect()  # For ESP8266

    e = espnow.ESPNow()
    e.active(True)
    peer = b"\xcc\xdb\xa7\x56\x3e\x00"  # MAC address of Worker 2's wifi interface
    e.add_peer(peer)  # Must add_peer() before send()

    data = {"hello": "world"}

    e.send(peer, json.dumps(data))
    e.send(b"end")


def worker2():
  # A WLAN interface must be active to send()/recv()
  sta = network.WLAN(network.STA_IF)
  sta.active(True)
  sta.disconnect()   # Because ESP8266 auto-connects to last Access Point

  e = espnow.ESPNow()
  e.active(True)

  while True:
      host, msg = e.recv()
      if msg:             # msg == None if timeout in recv()
          print(host, msg.decode("utf-8"))
          if msg == b'end':
              break
