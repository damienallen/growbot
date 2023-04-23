import json
from pathlib import Path

from influxdb_client.client.flux_table import TableList
from pydantic.dataclasses import dataclass

from server import CAPTURE_DIR
from server.hub.influx import CAPTURES_BUCKET, query_api


@dataclass
class Capture:
    time: str
    brightness: float
    dark: bool
    url: str


def to_url(file_path: Path) -> str:
    return str(file_path).replace("/data", "/media")


def load_captures(query: TableList) -> list[Capture]:
    records = json.loads(query.to_json(columns=["_time", "brightness", "url", "dark"]))

    captures = []
    for record in records:
        captures.append(
            Capture(
                time=record["_time"],
                brightness=round(record["brightness"], 2),
                url=record["url"],
                dark=record["dark"],
            )
        )

    return captures


def extract_dates(query: TableList) -> list[Capture]:
    records = json.loads(query.to_json(columns=["_time"]))
    return set([record["_time"] for record in records])


def get_captures(start: str, stop: str) -> list[Capture]:
    print(start, stop)
    query = query_api.query(
        f"""
        import "influxdata/influxdb/schema"
        from(bucket:"{CAPTURES_BUCKET}")
        |> range(start: {start}, stop: {stop})
        |> filter(fn: (r) => r["_measurement"] == "photo")
        |> filter(fn: (r) => r["_field"] == "url" or r["_field"] == "brightness")
        |> schema.fieldsAsCols()
        |> yield()
        """
    )

    return load_captures(query)


def get_captured_dates() -> list[Capture]:
    query = query_api.query(
        f"""
        import "influxdata/influxdb/schema"
        from(bucket:"{CAPTURES_BUCKET}")
        |> range(start: 0)
        |> filter(fn: (r) => r["_measurement"] == "photo")
        |> aggregateWindow(every: 1d, fn: first, createEmpty: false)
        |> yield()
        """
    )

    return extract_dates(query)


def get_captures_from_file() -> list[str]:
    file_list = [to_url(f) for f in (CAPTURE_DIR / "2023").glob("*.jpg")]
    file_list.sort()
    return file_list
