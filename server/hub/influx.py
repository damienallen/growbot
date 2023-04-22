from decouple import config
from influxdb_client import InfluxDBClient
from influxdb_client.client.write_api import SYNCHRONOUS

"""
Initialize connection to InfluxDB container 
"""
bucket_name = "growbot"
org_name = "pi4"

client = InfluxDBClient(
    url="http://localhost:8086",
    token=config("INFLUXDB_TOKEN"),
    org=org_name,
)


write_api = client.write_api(write_options=SYNCHRONOUS)
query_api = client.query_api()
delete_api = client.delete_api()
