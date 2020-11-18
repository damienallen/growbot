#!/usr/bin/env python

from draw import get_screen_image, base_path


if __name__ == "__main__":

    base_img = get_screen_image()
    base_img = base_img.rotate(-90, expand=True)
    base_img.save(base_path / "output" / "screen.png")
