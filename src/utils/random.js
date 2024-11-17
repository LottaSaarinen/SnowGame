import React, { useState } from 'react';
// Pyöristää luvun määriteltyyn tarkkuuteen.
function random(value, precision) {
    const multiplier = Math.pow(10, precision || 0); 
    return Math.round(value * multiplier) / multiplier;


const LemonClicker = () => {
  // Pelin tila
  const [lemons, setLemons] = useState(0); // Pisteet (sitruunat)
  const [gameMessage, setGameMessage] = useState(''); // Viesti pelaajalle

  // Satunnainen tapahtuma, joka voi antaa bonuksia
  const triggerRandomBonus = () => {
    const randomNum = Math.random(0,10000000000000000000); // Generoi satunnainen luku välillä 0 ja 1

    if (randomNum < 0.1) { // 10% mahdollisuus bonukseen
      const bonus = Math.floor(Math.random() * 100) + 1; // Satunnainen bonus 1-10 sitruunaa
      setGameMessage(`Bonus! Saat ${bonus} toimitukselle lisää apua!`);
      return bonus; // Palauttaa bonuksen määrän
    }
    return 0; // Ei bonusta
  };

  // Käsitellään sitruunan klikkaus
  const handleLemonClick = () => {
    const bonus = triggerRandomBonus(); // Kutsu satunnaista bonusta
    setLemons(lemons + 1 + bonus); // Lisää 1 sitruuna ja mahdollinen bonus
  };

  return (
    <div>
     
      <p> {lemons} paketin toimitusta!</p>
      <button onClick={handleLemonClick}>Toimita</button>
      {gameMessage && <p>{gameMessage}</p>} {/* Näytetään bonusviesti */}
    </div>
  );
};

}
  
export default random;
