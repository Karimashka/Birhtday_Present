from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent
BASE_URL = "http://localhost:8000"
app = FastAPI(title="Romantic Birthday API")


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


static_dir = BASE_DIR / "static"
static_dir.mkdir(exist_ok=True)

app.mount("/static", StaticFiles(directory=static_dir), name="static")


@app.get("/api/message")
async def get_message():
    return JSONResponse({"text": "С днём рождения, Солнышко ❤️!"})



@app.get("/api/photos")
async def get_photos():
    return JSONResponse(
        {
            "photos": [
                f"{BASE_URL}/static/photo1.jpg",
                f"{BASE_URL}/static/photo2.jpg",
                f"{BASE_URL}/static/photo3.jpg",
            ]
        }
    )


@app.get("/api/background-photos")
async def get_background_photos():
    return JSONResponse(
        {
            "photos": [
                f"{BASE_URL}/static/bg1.jpg",
                f"{BASE_URL}/static/bg2.jpg",
                f"{BASE_URL}/static/bg3.jpg",
                f"{BASE_URL}/static/bg4.jpg",
            ]
        }
    )


@app.post("/api/blow-candles")
async def blow_candles():
    return JSONResponse({"status": "candles_off"})

