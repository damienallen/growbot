from pathlib import Path

from decouple import Config, RepositoryEnv

ROOT = Path(__file__).parent.parent
ENV_PATH = ROOT / "config" / ".env"


# Load configuration from .env
config = Config(RepositoryEnv(str(ENV_PATH)))
MQTT_BROKER = config("MQTT_BROKER")
