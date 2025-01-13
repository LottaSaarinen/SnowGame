import { Howl, Howler } from 'howler';

export const playSound = (src) => {
  const sound = new Howl({
    src: [src],
    volume: 0.5,
  });

  sound.play();
};
