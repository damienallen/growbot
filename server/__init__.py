import os
import tomllib

from pathlib import Path

ROOT = Path(__file__).parent.parent

with open(ROOT / "pyproject.toml", "rb") as f:
    VERSION = tomllib.load(f)["tool"]["poetry"]["version"]

# Timeseries data
if os.environ.get("DATA_DIR"):
    DATA_DIR = Path(os.environ["DATA_DIR"])
    CAPTURE_DIR = Path(os.environ["CAPTURE_DIR"])
else:
    DATA_DIR = ROOT / "data" / "local"
    CAPTURE_DIR = ROOT / "data" / "captures"

DATA_DIR.mkdir(parents=True, exist_ok=True)
CAPTURE_DIR.mkdir(parents=True, exist_ok=True)

# Load configuration from env
MQTT_BROKER = os.environ.get("MQTT_BROKER", "localhost")
MQTT_TOPIC = os.environ.get("MQTT_TOPIC", "tele/tasmota_133D41/SENSOR")
