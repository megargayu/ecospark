from machine import Pin, I2C, ADC
from time import sleep
import bme280
import ubinascii
import espnow
import network

#ESP NOW CODE lines 10-23

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

i2c = I2C(scl=Pin(22), sda=Pin(21), freq=10000)
buzzer = Pin(15, Pin.OUT)

buzzer_level = 0

bme = bme280.BME280(i2c=i2c)

# Buzzer stuff
buzzer = Pin(15, Pin.OUT)

# Create an ADC object
mq2 = ADC(Pin(13))

# Set the ADC resolution to 12 bits
mq2.width(ADC.WIDTH_12BIT)

# Set the attenuation level (0-3) to adjust the input voltage range
mq2.atten(ADC.ATTN_11DB)

while True:
  temp = (bme.read_temperature()/100) # Temperature in degrees C
  hum = bme.read_humidity() / 1024 # Humidity in percent
  pres = bme.read_pressure() / 256 / 1000 # Pressure in kPa
  
  # uncomment for temperature in Fahrenheit
  #temp = (bme.read_temperature()/100) * (9/5) + 32
  #temp = str(round(temp, 2)) + 'F'
  
  print('Temperature: ', temp)
  print('Humidity: ', hum)
  print('Pressure: ', pres)
  
  mq2_value = mq2.read()
  
  print('MQ2: ', mq2_value)
  
  if mq2_value > 1500:
      buzzer_level = 1
  else:
      buzzer_level = 0


  buzzer.value(buzzer_level)
  print('----------------------------------------------------------------------------------------')
  sleep(1)