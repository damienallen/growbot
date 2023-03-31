import hashlib
import os
import subprocess
from datetime import datetime
from pathlib import Path
from shutil import copy2

from server import CAPTURE_DIR

CRONY_HOST = "pi-01"


def main():
    timestamp = datetime.now().isoformat()
    print(f"[{timestamp}] Fetching camera capture from {CRONY_HOST}\n")

    temp_path = CAPTURE_DIR / "capture.jpg"
    cmd = [
        "rsync",
        "-azP",
        "pi@pi-01:/home/pi/image.jpg",
        str(temp_path),
    ]

    proc = subprocess.run(cmd)

    if proc.returncode > 0:
        message = "rsync operation failed!"
        print(message)
        raise Exception(message)

    last_capture = get_last_capture()
    make_archive = True

    if last_capture:
        last_hash = hashlib.sha1()
        with open(last_capture, "rb") as f:
            last_hash.update(f.read())

        temp_hash = hashlib.sha1()
        with open(temp_path, "rb") as f:
            temp_hash.update(f.read())

        make_archive = not last_hash.hexdigest() == temp_hash.hexdigest()

    if make_archive:
        capture_path = get_capture_path()
        copy2(temp_path, capture_path)
        print(f" + {capture_path}")
    else:
        print("Previous capture unchanged")


def get_last_capture() -> Path | None:
    """
    Get path of previous capture
    """
    now = datetime.now()
    dir = CAPTURE_DIR / str(now.year)
    files = [(f.stem, f) for f in dir.glob("*.jpg")]
    if files:
        files.sort(key=lambda tup: tup[0], reverse=True)
        return files[0][1]

    return None


def get_capture_path() -> Path:
    """
    Get capture path based on current date
    """
    now = datetime.now()
    dir = CAPTURE_DIR / str(now.year)
    dir.mkdir(parents=True, exist_ok=True)

    timestamp = now.strftime("%Y%m%d_%H%M%S")
    caputre_path = dir / f"{timestamp}.jpg"
    return caputre_path


if __name__ == "__main__":
    if "FASTAPI" not in os.environ:
        main()
