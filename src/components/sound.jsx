import React, { useRef } from "react";

const GameMusic = () => {
  const audioRef = useRef(null);

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <div>
      <audio ref={audioRef} src="/path-to-your-music/music.mp3" loop />
      <button onClick={playMusic}>Play Music</button>
      <button onClick={pauseMusic}>Pause Music</button>
    </div>
  );
};

export default GameMusic;
