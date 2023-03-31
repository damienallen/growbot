import argparse
import asyncio
import json
from typing import List

from asyncio_mqtt import Client, MqttError
from display import update_display


async def sensor_reader(broker: str):
    """
    Connect to the MQTT broker and sensor messages
    """
    async with Client(broker) as client:
        async with client.filtered_messages("tasmota/SENSOR") as messages:
            await client.subscribe("tasmota/#")
            await handle_messages(messages, update_display)


async def handle_messages(messages: List, display_function):
    async for message in messages:
        m = message.payload.decode()
        try:
            sensor_data = json.loads(m)
            if "BME680" in sensor_data or "ANALOG" in sensor_data:
                print(m)
                display_function(sensor_data)
            else:
                print(f"Unexpected message: {m}")

        except json.decoder.JSONDecodeError:
            print(f"-> {m}")


async def main(broker: str):
    # Reconnect automatically if the connection is lost.
    reconnect_interval = 3  # [s]
    while True:
        try:
            await sensor_reader(broker)
        except MqttError as error:
            print(f'Error "{error}". Reconnecting in {reconnect_interval} seconds.')
        finally:
            await asyncio.sleep(reconnect_interval)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--broker", help="MQTT broker")
    args = parser.parse_args()
    broker = args.broker if args.broker else "localhost"
    print(f"MQTT broker: {broker}")

    asyncio.run(main(broker))
