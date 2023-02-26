import os
from pathlib import Path

ROOT = Path(__file__).parent.parent

# Timeseries data
if os.environ.get("DATA_DIR"):
    DATA_DIR = Path(os.environ["DATA_DIR"])
    DATA_DIR.mkdir(parents=True, exist_ok=True)
else:
    DATA_DIR = ROOT / "data" / "local"

# Load configuration from env
MQTT_BROKER = os.environ.get("MQTT_BROKER", "localhost")
MQTT_TOPIC = os.environ.get("MQTT_TOPIC", "tele/tasmota_133D41/SENSOR")
