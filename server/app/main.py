from datetime import datetime

import pandas as pd
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from server import DATA_DIR
from server.app.timelapse import get_captures

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


@app.get("/timelapse/")
def timelapse(request: Request):
    captures = get_captures()
    return {"count": len(captures), "captures": captures}


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
