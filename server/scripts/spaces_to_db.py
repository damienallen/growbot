from influxdb_client import Point
from tempfile import NamedTemporaryFile
import subprocess
import httpx


from server.hub.spaces import client
from server.hub.influx import write_api, bucket_name
from datetime import datetime
from tqdm import tqdm


ORIGIN_ENDPOINT = "https://growcam.ams3.digitaloceanspaces.com"
DARK_THRESHOLD = 0.1


def run():
    bucket_objs = client.list_objects(Bucket="growcam")["Contents"]

    pbar = tqdm(bucket_objs)
    for obj in pbar:
        key = obj["Key"]
        url = f"{ORIGIN_ENDPOINT}/{key}"

        pbar.set_description(key)

        with NamedTemporaryFile() as tmp:
            r = httpx.get(url)
            tmp.write(r.content)

            sp = subprocess.run(
                ["vips", "avg", tmp.name], capture_output=True, text=True
            )
            brightness = round(float(sp.stdout.replace("\n", "")) / 255, 2)
            dark = brightness < DARK_THRESHOLD

        p = (
            Point("photo")
            .field("brightness", brightness)
            .field("url", url)
            .tag("dark", dark)
            .time(datetime.strptime(key, "photo_%Y%m%d_%H%M%S.jpg"))
        )
        write_api.write(bucket=bucket_name, record=p)


if __name__ == "__main__":
    run()
