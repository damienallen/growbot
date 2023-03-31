from pathlib import Path

from draw import get_screen_image

REPO_ROOT = Path(__file__).parent.parent


def update_image():
    save_dir = REPO_ROOT / "data"
    save_dir.mkdir(parents=True, exist_ok=True)
    screenshot_path = save_dir / "screen.png"
    print(f"Saving simulated screeen to: {screenshot_path}")

    base_img = get_screen_image()
    base_img = base_img.rotate(-90, expand=True)
    base_img.save(screenshot_path)


if __name__ == "__main__":
    update_image()
