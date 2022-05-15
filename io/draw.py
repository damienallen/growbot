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

# Dummy data
dummy_data = {
    "Time": "2020-11-29T01:09:58",
    "ANALOG": {"Range": 100},
    "BME680": {
        "Temperature": 26.5,
        "Humidity": 43.3,
        "DewPoint": 13.0,
        "Pressure": 1024.1,
        "Gas": 477.15,
    },
    "PressureUnit": "hPa",
    "TempUnit": "C",
}


def get_screen_image(sensor_data=dummy_data) -> Image:

    # Add background template
    base_img = Image.open(base_path / "assets" / "growbot.png")

    # Add dymanic components
    add_items(base_img, sensor_data)

    return base_img


def add_items(base: Image, sensor_data):
    """
    Add dynamic sensor data
    """
    items = Image.new("I", (W, container_height))
    add_clock(items)
    add_light(items)
    add_soil_moisture(items, sensor_data["ANALOG"]["Range"])
    add_temperature(items, sensor_data["BME680"]["Temperature"])
    add_humidity(items, sensor_data["BME680"]["Humidity"])
    add_dew_point(items, sensor_data["BME680"]["DewPoint"])
    add_pressure(items, sensor_data["BME680"]["Pressure"])

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


def add_soil_moisture(base: Image, value: int):
    img = Image.new("I", (item_width, item_height))
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, W, item_height), fill=inky_display.RED)

    write_header("Soil", draw, 6)
    write_header("Moist", draw, 18)
    write_value(100 - value, "%", draw, 26, large=True)
    base.paste(img, (0, 0))


def add_temperature(base: Image, value: float):
    img = Image.new("I", (item_width, half_item_height))
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, W, half_item_height), fill=inky_display.BLACK)

    write_header("Temp", draw, 8)
    write_value(value, "C", draw, 18)
    base.paste(img, (0, item_height + margin))


def add_humidity(base: Image, value: float):
    img = Image.new("I", (item_width, half_item_height))
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, W, half_item_height), fill=inky_display.BLACK)

    write_header("Hum", draw, 8)
    write_value(value, "%", draw, 18)
    base.paste(img, (item_width + 2, item_height + margin))


def add_dew_point(base: Image, value: float):
    img = Image.new("I", (item_width, half_item_height))
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, W, half_item_height), fill=inky_display.BLACK)

    write_header("Dew", draw, 8)
    write_value(value, "C", draw, 18)
    base.paste(img, (0, item_height + half_item_height + margin * 2))


def add_pressure(base: Image, value: float):
    img = Image.new("I", (item_width, half_item_height))
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, W, half_item_height), fill=inky_display.BLACK)

    write_header("Press", draw, 8)
    write_value(round(value / 10), "kPa", draw, 18)
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
    value, unit: str, draw: ImageDraw, top_margin: int = 0, large: bool = False
):

    value_text = str(value) if large else f"{value} {unit}"
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
