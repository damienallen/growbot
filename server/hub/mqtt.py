import asyncio
import json
import lzma
import pickle
from dataclasses import asdict
from datetime import datetime
from pathlib import Path

import pandas as pd
from asyncio_mqtt import Client, Message
from pydantic.dataclasses import dataclass

from server import DATA_DIR, MQTT_BROKER, MQTT_TOPIC


@dataclass
class BME680Report:
    Temperature: float
    Humidity: float
    DewPoint: float
    Pressure: float
    Gas: float


@dataclass
class SensorPayload:
    Time: str
    BME680: BME680Report
    PressureUnit: str
    TempUnit: str


@dataclass
class SensorReport:
    timestamp: pd.Timestamp
    temperature: float
    humidity: float
    dew_point: float
    air_pressure: float
    gas_resistance: float


async def main():
    async with Client(MQTT_BROKER) as client:
        print(f"Connected to broker '{MQTT_BROKER}'")
        async with client.messages() as messages:
            await client.subscribe(MQTT_TOPIC)
            async for message in messages:
                await on_message(message)


async def on_message(message: Message):
    payload = SensorPayload(**json.loads(message.payload))
    await write(payload)


async def write(payload: SensorPayload):
    """
    Structure sensor payload in pandas dataframe and serialize as compressed pickle
    """
    report = SensorReport(
        timestamp=pd.Timestamp(datetime.strptime(payload.Time, "%Y-%m-%dT%H:%M:%S")),
        temperature=payload.BME680.Temperature,
        humidity=payload.BME680.Humidity,
        dew_point=payload.BME680.DewPoint,
        air_pressure=payload.BME680.Pressure,
        gas_resistance=payload.BME680.Gas,
    )

    df = pd.DataFrame([asdict(report)])
    df.set_index("timestamp", inplace=True)

    record_path = await get_record_path()
    if record_path.exists():
        existing_df = pd.read_pickle(record_path)
        df = pd.concat([existing_df, df]) if record_path.exists() else df

    print(f"{report.timestamp} -> {payload.BME680} ({len(df)} records)")
    with lzma.open(str(record_path), "w") as f:
        pickle.dump(df, f)


async def get_record_path() -> Path:
    """
    Get record path based on current date
    """
    now = datetime.now()
    dir = DATA_DIR / str(now.year) / str(now.month)
    dir.mkdir(parents=True, exist_ok=True)
    record_path = dir / f"{now.day}.xz"
    return record_path


if __name__ == "__main__":
    print("Starting asyncio loop with MQTT client")
    asyncio.run(main())
