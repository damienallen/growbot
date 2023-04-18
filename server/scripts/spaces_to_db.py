from influxdb_client import Point
import os
import subprocess

from server.hub.spaces import client
from server.hub.influx import bucket_name
from datetime import datetime
from tqdm import tqdm

ORIGIN_ENDPOINT = "https://growcam.ams3.digitaloceanspaces.com"


def run():
    bucket_name = "growcam"
    bucket_objs = client.list_objects(Bucket=bucket_name)["Contents"]

    pbar = tqdm(bucket_objs)
    for obj in pbar:
        key = obj["Key"]
        url = f"{ORIGIN_ENDPOINT}/{key}"

        pbar.set_description(key)

        # sp = subprocess.run(["vips", "avg", file_path], capture_output=True, text=True)

        # brightness = round(float(sp.stdout.replace("\n", "")) / 255, 2)

        # file_name = file_path.name
        # url = f"/media/captures/2023/{file_name}"
        # p = (
        #     Point("photo")
        #     .field("brightness", brightness)
        #     .tag("url", url)
        #     .time(int(datetime.strptime(file_name, "%Y%m%d_%H%M%S.jpg").timestamp()))
        # )
        # write_api.write(bucket=bucket_name, record=p)
        # print(p)


if __name__ == "__main__":
    run()
