from datetime import datetime

import pandas as pd
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from server import DATA_DIR, VERSION
from server.app.timelapse import get_captured_dates, get_captures

app = FastAPI()
app.mount("/media", StaticFiles(directory=DATA_DIR), name="media")

# Handle CORS
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def index(request: Request):
    return {"version": f"v{VERSION}"}


@app.get("/captures/")
def captures(start: str, stop: str):
    captures = get_captures(start, stop)
    return {"count": len(captures), "captures": captures}


@app.get("/captures/available/")
def captures_available(request: Request):
    dates = get_captured_dates()
    return {"count": len(dates), "dates": dates}


@app.get("/sensors/")
def sensors(request: Request):
    x, y = load_df(datetime.now())
    return [
        {
            "type": "scatter",
            "mode": "lines",
            "name": "Temperature (degC)",
            "x": x,
            "y": y,
            "line": {"color": "#7F7F7F"},
        }
    ]


def load_df(date: datetime) -> pd.DataFrame:
    record_path = DATA_DIR / str(date.year) / str(date.month) / f"{date.day}.xz"

    if not record_path.exists():
        return [], []

    df = pd.read_pickle(record_path)
    return list(str(d) for d in df.index.values), df["temperature"].tolist()
