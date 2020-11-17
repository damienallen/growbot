#!/usr/bin/env python

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from inky.auto import auto
from font_fredoka_one import FredokaOne
from datetime import datetime

# Get the current path
base_path = Path(__file__).parent

# Display
W = 104
H = 212

# Set up the Inky display
inky_display = auto(ask_user=True, verbose=True)
inky_display.set_border(inky_display.BLACK)

# Add background template
base_img = Image.open(base_path / "assets" / "growbot.png")
draw = ImageDraw.Draw(base_img)

font = ImageFont.truetype(FredokaOne, 22)

clock_width = 40
clock_height = 14
# clock = Image.new("L", (clock_height, clock_width))
clock = Image.new("L", (40, 40))
draw_clock = ImageDraw.Draw(clock)

time = datetime.now().strftime("%H:%M")
draw_clock.rectangle((0, 0, clock_width + 1, clock_height + 1), fill=inky_display.BLACK)
draw_clock.text((4, 2), time, fill=inky_display.WHITE)

clock = clock.rotate(90)
base_img.paste(clock, (0, W - clock_width))

inky_display.set_image(base_img)
inky_display.lut = "red"
inky_display.show()
