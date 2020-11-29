import asyncio
import json
import argparse
from asyncio_mqtt import Client, MqttError
from typing import List

from draw import base_path, get_screen_image


async def sensor_reader(broker: str):

    # Inky display
    if broker == "localhost":
        from display import update_display

        display_function = update_display
    else:
        display_function = update_image

    # Connect to the MQTT broker
    async with Client(broker) as client:

        # Hangle sensor messages
        async with client.filtered_messages("tasmota/SENSOR") as messages:
            await client.subscribe("tasmota/#")
            await handle_messages(messages, display_function)


async def handle_messages(messages: List, display_function):
    async for message in messages:
        m = message.payload.decode()
        try:
            sensor_data = json.loads(m)
            if "BME680" in sensor_data or "ANALOG" in sensor_data:
                await display_function(sensor_data)
            else:
                print(f"Unexpected message: {m}")

        except json.decoder.JSONDecodeError:
            print(f"-> {m}")


async def update_image(sensor_data):
    base_img = get_screen_image(sensor_data)
    base_img = base_img.rotate(-90, expand=True)
    (base_path / "output").mkdir(parents=True, exist_ok=True)
    base_img.save(base_path / "output" / "screen.png")


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
    print("BOKRNER", broker)
    asyncio.run(main(broker))
