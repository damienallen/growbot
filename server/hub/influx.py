from influxdb_client.client.write_api import SYNCHRONOUS
from influxdb_client import InfluxDBClient
from decouple import config

"""
Initialize connection to InfluxDB container 
"""
bucket_name = "growbot"
org_name = "pi"

client = InfluxDBClient(
    url="http://localhost:8086",
    token=config("DOCKER_INFLUXDB_INIT_ADMIN_TOKEN"),
    org=org_name,
)


write_api = client.write_api(write_options=SYNCHRONOUS)
query_api = client.query_api()
delete_api = client.delete_api()
