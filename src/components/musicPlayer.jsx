import React, { useEffect } from 'react';
import { Howl } from 'howler';

const MusicPlayer = ({ src, isPlaying, currentTrack, onStateChange }) => {
  useEffect(() => {
    const sound = new Howl({
      src: [src],
      autoplay: isPlaying,
      loop: true,
      volume: 0.5
    });

    if (isPlaying) {
      sound.play();
    } else {
      sound.pause();
    }

    sound.on('end', () => {
      onStateChange(false, currentTrack);
    });

    return () => {
      sound.unload();
    };
  }, [src, isPlaying, currentTrack, onStateChange]);

  const togglePlayPause = () => {
    onStateChange(!isPlaying, src);
  };

  return (
    <div>
      <button onClick={togglePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default MusicPlayer;
/* MusicPlayer.js
import React, { useEffect } from 'react';
import { Howl } from 'howler';

const MusicPlayer = ({ src }) => {
  useEffect(() => {
    const sound = new Howl({
      src: [src],// [process.env.PUBLIC_URL + src],
      autoplay: true,
      loop: true,
      volume: 0.5
    });

    sound.play();

    return () => {
      sound.unload();
    };
  }, [src]);

  return null;
};

export default MusicPlayer;
//      <MusicPlayer src="/src/assets/audio/musa.mp3" /> {/* Lisää tämä */