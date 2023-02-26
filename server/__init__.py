import os
from pathlib import Path

ROOT = Path(__file__).parent


# Load configuration from env
MQTT_BROKER = os.environ.get("MQTT_BROKER", "localhost")
MQTT_TOPIC = os.environ.get("MQTT_TOPIC", "tele/tasmota_133D41/SENSOR")
