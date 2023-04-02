from pathlib import Path

from server import CAPTURE_DIR


def to_url(file_path: Path) -> str:
    return str(file_path).replace("/data", "/media")


def get_captures() -> list[str]:
    file_list = [to_url(f) for f in (CAPTURE_DIR / "2023").glob("*.jpg")]
    file_list.sort()
    return file_list
