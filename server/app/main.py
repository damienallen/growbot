from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi_mqtt import FastMQTT, MQTTConfig

from server import MQTT_BROKER, MQTT_TOPIC

app = FastAPI()

# Handle CORS
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print(f"{MQTT_BROKER=}")
mqtt_config = MQTTConfig(host=MQTT_BROKER)

mqtt = FastMQTT(config=mqtt_config)
mqtt.init_app(app)


@app.get("/sensors/")
def sensors(request: Request):
    return {"Hello": "you"}


@mqtt.on_connect()
def connect(client, flags, rc, properties):
    mqtt.client.subscribe("/tasmota_133D41/SENSOR")  # subscribing mqtt topic
    # mqtt.client.subscribe(MQTT_TOPIC)  # subscribing mqtt topic
    print("Connected: ", client, flags, rc, properties)


@mqtt.on_message()
async def message(client, topic, payload, qos, properties):
    print("Received message: ", topic, payload.decode(), qos, properties)


@mqtt.on_disconnect()
def disconnect(client, packet, exc=None):
    print("Disconnected")


@mqtt.on_subscribe()
def subscribe(client, mid, qos, properties):
    print("subscribed", client, mid, qos, properties)
