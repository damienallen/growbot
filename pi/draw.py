#!/usr/bin/env python

from datetime import datetime
from pathlib import Path

from inky.phat import InkyPHAT
from PIL import Image, ImageDraw, ImageFont

# Get the current path
base_path = Path(__file__).parent

# Get display class
inky_display = InkyPHAT("red")
W = 104
H = 212

# Fonts
fonts_dir = base_path / "assets" / "fonts"
main_font = "coders_crux.ttf"
accent_font = "rainy_hearts.ttf"
header_font = ImageFont.truetype(str(fonts_dir / main_font), 16)
body_large_font = ImageFont.truetype(str(fonts_dir / accent_font), 40)
body_small_font = ImageFont.truetype(str(fonts_dir / accent_font), 16)

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
    add_soil_moisture(items)
    add_temperature(items)
    add_humidity(items)
    add_dew_point(items)
    add_pressure(items)

    items = items.rotate(90, expand=True)
    base.paste(items, (0, 0))


def add_clock(base: Image):
    """
    Add clock in upper-left corner
    """
    clock = Image.new("I", (item_width, half_item_height))
    draw = ImageDraw.Draw(clock)
    draw.rectangle((0, 0, item_width, half_item_height), fill=inky_display.BLACK)

    now = datetime.now()
    time = now.strftime("%H:%M")
    date = now.strftime("%d %b")

    write_header(time, draw, 10)
    write_header(date.upper(), draw, 22)
    base.paste(clock, (item_width + margin, 0))


def add_light(base: Image):
    img = Image.new("I", (item_width, item_height))
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, item_width, half_item_height), fill=inky_display.BLACK)

    write_header("Lights", draw, 10)
    write_header("Off", draw, 22)
    base.paste(img, (item_width + margin, half_item_height + margin))


def add_soil_moisture(base: Image):
    img = Image.new("I", (item_width, item_height))
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, W, item_height), fill=inky_display.RED)

    write_header("Soil", draw, 6)
    write_header("Moist", draw, 18)
    write_value("15", "%", draw, 26, large=True)
    base.paste(img, (0, 0))


def add_temperature(base: Image):
    img = Image.new("I", (item_width, half_item_height))
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, W, half_item_height), fill=inky_display.BLACK)

    write_header("Temp", draw, 8)
    write_value("22.2", "C", draw, 18)
    base.paste(img, (0, item_height + margin))


def add_humidity(base: Image):
    img = Image.new("I", (item_width, half_item_height))
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, W, half_item_height), fill=inky_display.BLACK)

    write_header("Hum", draw, 8)
    write_value("56.8", "%", draw, 18)
    base.paste(img, (item_width + 2, item_height + margin))


def add_dew_point(base: Image):
    img = Image.new("I", (item_width, half_item_height))
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, W, half_item_height), fill=inky_display.BLACK)

    write_header("Dew", draw, 8)
    write_value("13.2", "C", draw, 18)
    base.paste(img, (0, item_height + half_item_height + margin * 2))


def add_pressure(base: Image):
    img = Image.new("I", (item_width, half_item_height))
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, W, half_item_height), fill=inky_display.BLACK)

    write_header("Press", draw, 8)
    write_value("102", "kPa", draw, 18)
    base.paste(img, (item_width + 2, item_height + half_item_height + margin * 2))


def write_header(text: str, draw: ImageDraw, top_margin: int = 0):
    w, h = header_font.getsize(text)
    draw.text(
        ((item_width - w) / 2, top_margin),
        text.upper(),
        font=header_font,
        fill=inky_display.WHITE,
    )


def write_value(
    text: str, unit: str, draw: ImageDraw, top_margin: int = 0, large: bool = False
):

    value_text = text if large else f"{text} {unit}"
    value_font = body_large_font if large else body_small_font
    w, h = value_font.getsize(value_text)
    draw.text(
        ((item_width - w) / 2, top_margin),
        value_text,
        font=value_font,
        fill=inky_display.WHITE,
    )

    if large:
        uw, uh = body_small_font.getsize(unit)
        draw.text(
            ((item_width - uw) / 2, top_margin + h + 5),
            unit.upper(),
            font=body_small_font,
            fill=inky_display.WHITE,
        )
