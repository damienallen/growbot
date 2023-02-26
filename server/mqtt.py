import asyncio

from asyncio_mqtt import Client


async def main():
    async with Client("localhost") as client:
        async with client.messages() as messages:
            await client.subscribe("tele/tasmota_133D41/SENSOR")
            async for message in messages:
                print(message.payload)


if __name__ == "__main__":
    asyncio.run(main())
    asyncio.run(main())
