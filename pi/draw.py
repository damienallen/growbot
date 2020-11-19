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

logo_height = 44

container_height = H - logo_height - 2
item_height = round(container_height / 2)
item_width = round(W / 2)

half_item_height = round(item_height / 2)


def get_screen_image() -> Image:

    # Add background template
    base_img = Image.open(base_path / "assets" / "growbot.png")

    # Add dymanic components
    add_items(base_img)

    return base_img


def add_items(base: Image):
    """
    Add dynamic sensor data
    """
    items = Image.new("I", (W, container_height))
    add_clock(items)
    add_light(items)
    add_water(items)
    add_temperature(items)
    add_humidity(items)

    items = items.rotate(90, expand=True)
    base.paste(items, (0, 0))


def add_clock(base: Image):
    """
    Add clock in upper-left corner
    """
    clock = Image.new("I", (item_width, half_item_height))
    draw_clock = ImageDraw.Draw(clock)

    time = datetime.now().strftime("%H:%M")
    draw_clock.rectangle((0, 0, item_width, half_item_height), fill=inky_display.BLACK)
    draw_clock.text((2, 0), time, fill=inky_display.WHITE)

    base.paste(clock, (item_width + 1, 0))


def add_light(base: Image):
    light = Image.new("I", (item_width, item_height))
    draw_light = ImageDraw.Draw(light)

    draw_light.rectangle((0, 0, W, half_item_height - 1), fill=inky_display.BLACK)

    base.paste(light, (item_width + 1, half_item_height))


def add_water(base: Image):
    water = Image.new("I", (item_width, item_height))
    draw_water = ImageDraw.Draw(water)

    draw_water.rectangle((0, 0, W, item_height - 1), fill=inky_display.RED)

    base.paste(water, (0, 0))


def add_temperature(base: Image):
    temp = Image.new("I", (item_width, item_height))
    draw_temp = ImageDraw.Draw(temp)

    draw_temp.rectangle((0, 0, W, item_height - 1), fill=inky_display.BLACK)
    # draw_temp.text((2, 0), "TEST", fill=inky_display.WHITE)

    base.paste(temp, (0, item_height + 1))


def add_humidity(base: Image):
    hum = Image.new("I", (item_width, item_height))
    draw_hum = ImageDraw.Draw(hum)

    draw_hum.rectangle((0, 0, W, item_height - 1), fill=inky_display.RED)

    base.paste(hum, (item_width + 1, item_height + 1))