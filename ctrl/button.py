from gpiozero import Button, LED
from time import sleep

button = Button(16)
relay = LED(17)
relay.off()

while True:

    if button.is_pressed:
        relay.on()
        sleep(3)
        relay.off()
