from influxdb_client import InfluxDBClient, Point
from influxdb_client.client.write_api import SYNCHRONOUS
import os

bucket = "growbot"

client = InfluxDBClient(
    url="http://localhost:8086",
    token=os.environ.get("DOCKER_INFLUXDB_INIT_ADMIN_TOKEN"),
    org="pi",
)

write_api = client.write_api(write_options=SYNCHRONOUS)
query_api = client.query_api()

p = Point("photo").field("url", "https://some.thing")

write_api.write(bucket=bucket, record=p)
