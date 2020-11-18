#!/usr/bin/env python

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from inky.phat import InkyPHAT
from font_fredoka_one import FredokaOne
from datetime import datetime

# Get the current path
base_path = Path(__file__).parent

# Get display class
inky_display = InkyPHAT("red")

# Display
font = ImageFont.truetype(FredokaOne, 22)
W = 104
H = 212

clock_width = 36
clock_height = 14
logo_height = 30

sensor_container_height = H - clock_height - logo_height - 3
sensor_item_height = round(sensor_container_height / 2)
sensor_item_width = round(W / 2)


def get_screen_image() -> Image:

    # Add background template
    base_img = Image.open(base_path / "assets" / "growbot.png")

    # Add dymanic components
    add_clock(base_img)
    add_sensors(base_img)

    return base_img


def add_clock(base: Image):
    """
    Add clock in upper-left corner
    """

    clock = Image.new("I", (clock_width, clock_height))
    draw_clock = ImageDraw.Draw(clock)

    time = datetime.now().strftime("%H:%M")
    draw_clock.rectangle(
        (0, 0, clock_width + 1, clock_height + 1), fill=inky_display.BLACK
    )
    draw_clock.text((2, 0), time, fill=inky_display.WHITE)

    clock = clock.rotate(90, expand=True)
    base.paste(clock, (0, W - clock_width))


def add_sensors(base: Image):
    """
    Add dynamic sensor data
    """
    sensors = Image.new("I", (W, sensor_container_height))
    draw_sensors = ImageDraw.Draw(sensors)

    add_temperature(sensors)
    add_humidity(sensors)
    draw_sensors.text((2, 0), "TEST", fill=inky_display.WHITE)

    sensors = sensors.rotate(90, expand=True)

    base.paste(sensors, (clock_height + 1, 0))


def add_temperature(base: Image):
    temp = Image.new("I", (sensor_item_width, sensor_item_height))
    draw_temp = ImageDraw.Draw(temp)

    draw_temp.rectangle((0, 0, W, sensor_item_height - 1), fill=inky_display.BLACK)

    base.paste(temp, (0, 0))


def add_humidity(base: Image):
    hum = Image.new("I", (sensor_item_width, sensor_item_height))
    draw_hum = ImageDraw.Draw(hum)

    draw_hum.rectangle((0, 0, W, sensor_item_height - 2), fill=inky_display.RED)

    base.paste(hum, (sensor_item_width + 1, sensor_item_height + 1))
