import React, { useEffect, useRef, useState } from "react";
import SceneCanvas from "./components/SceneCanvas.jsx";
import {
  blowCandles,
  fetchMessage,
  fetchPhotos,
  fetchBackgroundPhotos,
} from "./api/client.js";

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [backgroundPhotos, setBackgroundPhotos] = useState([]);
  const [candlesOff, setCandlesOff] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [birthdayMessage, setBirthdayMessage] = useState("");
  const [hasWished, setHasWished] = useState(false);
  const [loadingWish, setLoadingWish] = useState(false);
  const [hintText, setHintText] = useState(
    "Вращай сцену левой кнопкой мыши :)"
  );

  const audioRef = useRef(null);
  const hasInteractedRef = useRef(false);
  const [isMusicOn, setIsMusicOn] = useState(false);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const data = await fetchPhotos();
        if (isMounted) {
          setPhotos(data.photos || []);
        }
      } catch (error) {
        console.error("Failed to load photos", error);
      }
      try {
        const bg = await fetchBackgroundPhotos();
        if (isMounted) {
          setBackgroundPhotos(bg.photos || []);
        }
      } catch (error) {
        console.error("Failed to load background photos", error);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const startMusicIfPossible = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setHintText("Закрой глазки и загадай желание.");
          hasInteractedRef.current = true;
          setIsMusicOn(true);
        })
        .catch((error) => {
          console.warn("Autoplay blocked:", error);
          setHintText("Нажми еще раз, если не слышишь музыку");
        });
    }
  };

  const handleMakeWish = async () => {
    if (loadingWish) return;
    setLoadingWish(true);
    startMusicIfPossible();

    try {
      const [blowRes, messageRes] = await Promise.all([
        blowCandles(),
        fetchMessage(),
      ]);

      if (blowRes.status === "candles_off") {
        setCandlesOff(true);
        setShowConfetti(true);
        setBirthdayMessage(messageRes.text || "");
        setHasWished(true);

        setTimeout(() => {
          setShowConfetti(false);
        }, 10000);
      }
    } catch (error) {
      console.error("Failed to make wish", error);
    } finally {
      setLoadingWish(false);
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => {
          setIsMusicOn(true);
        })
        .catch((error) => {
          console.warn("Autoplay blocked:", error);
        });
    } else {
      audioRef.current.pause();
      setIsMusicOn(false);
    }
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Романтическая ночь рождения</h1>
        <span>Для моего самого любимого человечка</span>
      </header>

      <SceneCanvas
        photos={photos}
        backgroundPhotos={backgroundPhotos}
        candlesOff={candlesOff}
        showConfetti={showConfetti}
        birthdayMessage={birthdayMessage}
      />

      <div className="app-ui">
        <button
          className="app-button"
          onClick={handleMakeWish}
          disabled={loadingWish || hasWished}
        >
          {hasWished
            ? "Желание исполнилось ✨"
            : loadingWish
            ? "Загадай желание..."
            : "Загадать желание"}
        </button>
        <div className="app-hint">{hintText}</div>
      </div>

      <audio ref={audioRef} src="/audio/romantic.mp3" loop preload="auto" />

      <button
        type="button"
        className="app-audio-toggle"
        onClick={toggleMusic}
        aria-label={isMusicOn ? "Выключить музыку" : "Включить музыку"}
      >
        {isMusicOn ? "🔊" : "🔇"}
      </button>
    </div>
  );
}

