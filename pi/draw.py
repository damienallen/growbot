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


def get_screen_image() -> Image:

    # Add background template
    base_img = Image.open(base_path / "assets" / "growbot.png")
    draw = ImageDraw.Draw(base_img)

    # Add dymanic components
    add_clock(base_img)
    add_sensors(base_img)

    return base_img


def add_clock(base: Image):
    """
    Add clock in upper-left corner
    """
    clock_width = 40
    clock_height = 14
    # clock = Image.new("L", (clock_height, clock_width))
    clock = Image.new("L", (40, 40))
    draw_clock = ImageDraw.Draw(clock)

    time = datetime.now().strftime("%H:%M")
    draw_clock.rectangle(
        (0, 0, clock_width + 1, clock_height + 1), fill=inky_display.BLACK
    )
    draw_clock.text((4, 2), time, fill=inky_display.WHITE)

    clock = clock.rotate(90)
    base.paste(clock, (0, W - clock_width))


def add_sensors(base: Image):
    """
    Add dynamic sensor data
    """
    sensors = Image.new("I", (104, 104))
    draw_sensors = ImageDraw.Draw(sensors)

    draw_sensors.text((0, 0), "TEST", fill=inky_display.BLACK)
    sensors = sensors.rotate(90)

    base.paste(sensors, (30, -2))
