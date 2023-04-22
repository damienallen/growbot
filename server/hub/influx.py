from decouple import config
from influxdb_client import InfluxDBClient
from influxdb_client.client.write_api import SYNCHRONOUS

"""
Initialize connection to InfluxDB container 
"""
RECORDS_BUCKET = "records"
CAPTURES_BUCKET = "captures"
org_name = "growbot"

client = InfluxDBClient(
    url="http://db:8086",
    token=config("INFLUXDB_TOKEN"),
    org=org_name,
)


write_api = client.write_api(write_options=SYNCHRONOUS)
query_api = client.query_api()
delete_api = client.delete_api()
