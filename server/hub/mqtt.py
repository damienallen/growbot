import asyncio
import json

from asyncio_mqtt import Client, Message

from server import MQTT_BROKER, MQTT_TOPIC


async def main():
    print(f"Connecting to broker '{MQTT_BROKER}'")
    async with Client(MQTT_BROKER) as client:
        async with client.messages() as messages:
            await client.subscribe(MQTT_TOPIC)
            async for message in messages:
                await on_message(message)


async def on_message(message: Message):
    payload = json.loads(message.payload)
    print(payload)


if __name__ == "__main__":
    print("Starting asyncio run")
    asyncio.run(main())
