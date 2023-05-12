from machine import Pin, I2C
from time import sleep
import bme280
import ubinascii
from network import ESPNOW

# ESP32 - Pin assignment
i2c = I2C(scl=Pin(22), sda=Pin(21), freq=10000)
buzzer = Pin(15, Pin.OUT)

buzzer_level = 0

while True:
  bme = bme280.BME280(i2c=i2c)
  temp = (bme.read_temperature()/100) * (9/5) + 32 # Temperature in degrees F
  hum = bme.read_humidity() / 1024 # Humidity in percent
  pres = bme.read_pressure() / 256 / 1000 # Pressure in kPa
  
  # uncomment for temperature in Fahrenheit
  #temp = (bme.read_temperature()/100) * (9/5) + 32
  #temp = str(round(temp, 2)) + 'F'
  
  print('Temperature: ', temp)
  print('Humidity: ', hum)
  print('Pressure: ', pres)
  if hum > 65:
      buzzer_level = 1
  else:
      buzzer_level = 0


  buzzer.value(buzzer_level)
  print('----------------------------------------------------------------------------------------')
  sleep(1)