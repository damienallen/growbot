#!/usr/bin/env python

from draw import get_screen_image
from inky.auto import auto

if __name__ == "__main__":

    # Set up the Inky display
    inky_display = auto(ask_user=True, verbose=True)
    inky_display.set_border(inky_display.WHITE)

    inky_display.set_image(get_screen_image())
    inky_display.lut = "red"
    inky_display.show()
