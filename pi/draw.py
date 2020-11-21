#!/usr/bin/env python

from datetime import datetime
from pathlib import Path

from font_fredoka_one import FredokaOne
from inky.phat import InkyPHAT
from PIL import Image, ImageDraw, ImageFont

# Get the current path
base_path = Path(__file__).parent

# Get display class
inky_display = InkyPHAT("red")

# Display
fonts_dir = base_path / "assets" / "fonts"
# font = ImageFont.truetype(FredokaOne, 14)
header_font = ImageFont.truetype(str(fonts_dir / "vcr_osd_mono.ttf"), 12)
W = 104
H = 212

logo_height = 42

margin = 2
container_height = H - logo_height
item_height = round(container_height / 2) - margin
item_width = round((W - margin) / 2)

half_item_height = round(item_height / 2) - margin


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
    draw = ImageDraw.Draw(clock)

    now = datetime.now()
    time = now.strftime("%H:%M")
    date = now.strftime("%d %b")

    draw.rectangle((0, 0, item_width, half_item_height), fill=inky_display.BLACK)
    draw.text((11, 6), time, fill=inky_display.WHITE)
    draw.text((8, 20), date.upper(), fill=inky_display.WHITE)

    base.paste(clock, (item_width + margin, 0))


def add_light(base: Image):
    img = Image.new("I", (item_width, item_height))
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, item_width, half_item_height), fill=inky_display.BLACK)

    write_header("Lights", 5, draw)
    write_header("On", 20, draw)
    base.paste(img, (item_width + margin, half_item_height + margin))


def add_temperature(base: Image):
    img = Image.new("I", (item_width, item_height))
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, W, item_height), fill=inky_display.BLACK)

    write_header("Temp.", 0, draw)
    base.paste(img, (0, 0))


def add_water(base: Image):
    img = Image.new("I", (item_width, item_height))
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, W, item_height), fill=inky_display.RED)

    write_header("Moist.", 0, draw)
    base.paste(img, (0, item_height + margin))


def add_humidity(base: Image):
    img = Image.new("I", (item_width, item_height))
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, W, item_height), fill=inky_display.BLACK)

    write_header("Hum.", 0, draw)
    base.paste(img, (item_width + 2, item_height + margin))


def write_header(text: str, top_margin: int, draw: ImageDraw):
    w, h = header_font.getsize(text)
    draw.text(
        ((item_width - w) / 2, top_margin),
        text.upper(),
        font=header_font,
        fill=inky_display.WHITE,
    )
