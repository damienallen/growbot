import subprocess
from datetime import datetime

from influxdb_client import Point

from server import CAPTURE_DIR
from server.hub.influx import CAPTURES_BUCKET, write_api


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
        write_api.write(bucket=CAPTURES_BUCKET, record=p)
        print(p)


if __name__ == "__main__":
    run()
