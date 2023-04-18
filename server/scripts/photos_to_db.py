from influxdb_client import Point
from server.hub.influx import write_api, bucket_name
import subprocess

from server import CAPTURE_DIR
from datetime import datetime


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
        write_api.write(bucket=bucket_name, record=p)
        print(p)


if __name__ == "__main__":
    run()
