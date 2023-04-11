from influxdb_client import InfluxDBClient, Point
from influxdb_client.client.write_api import SYNCHRONOUS
import os
import subprocess

from server import CAPTURE_DIR
from datetime import datetime

bucket = "growbot"
client = InfluxDBClient(
    url="http://localhost:8086",
    token=os.environ.get("DOCKER_INFLUXDB_INIT_ADMIN_TOKEN"),
    org="pi",
)

write_api = client.write_api(write_options=SYNCHRONOUS)
query_api = client.query_api()


def run():
    photos_dir = CAPTURE_DIR / "2023"
    file_list = [f for f in photos_dir.glob("*.jpg")]

    for file_path in file_list:
        sp = subprocess.run(["vips", "avg", file_path], capture_output=True, text=True)

        brightness = round(float(sp.stdout.replace("\n", "")) / 255, 2)

        file_name = file_path.name
        url = f"/media/captures/2023/{file_name}"
        p = (
            Point("photo")
            .field("brightness", brightness)
            .tag("url", url)
            .tag("path", file_path)
            .time(int(datetime.strptime(file_name, "%Y%m%d_%H%M%S.jpg").timestamp()))
        )
        write_api.write(bucket=bucket, record=p)
        print(p)


if __name__ == "__main__":
    run()
