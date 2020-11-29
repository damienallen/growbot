import asyncio
import json
from asyncio_mqtt import Client, MqttError
from typing import List


async def sensor_reader():

    # Connect to the MQTT broker
    async with Client("192.168.178.37") as client:

        # Hangle sensor messages
        async with client.filtered_messages("tasmota/SENSOR") as messages:
            await client.subscribe("tasmota/#")
            await handle_messages(messages)


async def handle_messages(messages: List):
    async for message in messages:
        m = message.payload.decode()
        try:
            sensor_data = json.loads(m)
            if "BME680" in sensor_data or "ANALOG" in sensor_data:
                await update_display(sensor_data)
            else:
                print(f"Unexpected message: {m}")

        except json.decoder.JSONDecodeError:
            print(f"-> {m}")


async def update_display(sensor_data):
    print("Updating", sensor_data)


async def main():
    # Reconnect automatically if the connection is lost.
    reconnect_interval = 3  # [s]
    while True:
        try:
            await sensor_reader()
        except MqttError as error:
            print(f'Error "{error}". Reconnecting in {reconnect_interval} seconds.')
        finally:
            await asyncio.sleep(reconnect_interval)


asyncio.run(main())
