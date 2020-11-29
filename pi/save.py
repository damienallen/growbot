#!/usr/bin/env python

from draw import base_path, get_screen_image

if __name__ == "__main__":

    base_img = get_screen_image()
    base_img = base_img.rotate(-90, expand=True)
    (base_path / "output").mkdir(parents=True, exist_ok=True)
    base_img.save(base_path / "output" / "screen.png")
