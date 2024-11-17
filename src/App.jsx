import { useState } from 'react';
import AppRouter from './components/AppRouter';
import items from './config/items.js';
import getPurchasableItems from './utils/getPurchasableItems';
import round from './utils/round';
import './App.css'
import useLocalStorage from './utils/useLocalStorage';


function App() {

  // Esitellään pelin laskennalliset alkuarvot.
  const initialstats = {
    clicks: 0,
    balance: 0,
    increase: 1,
    itemstobuy: 0,
    upgrades: 0,
    collected: 0
  }

  // Luodaan tilamuuttuja, johon tallennetaan pelin laskennalliset tiedot.
 
  //const [stats, setStats] = useState(initialstats);
    // Luodaan taltio, johon tallennetaan pelin laskennalliset tiedot.
    const [stats, setStats, resetStats] = useLocalStorage('lemon-stats',initialstats);
    const [gameMessage, setGameMessage] = useState(''); // Viesti pelaajalle

    // Satunnainen tapahtuma, joka voi antaa bonuksia
    const triggerRandomBonus = () => {
      const randomNum = Math.random(0,1000); // Generoi satunnainen luku välillä 0 ja 1
  
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
  
    // Luodaan taltio, johon tallennetaan tuotelista.
    const [storeitems,setStoreitems, resetStoreitems] = useLocalStorage('lemon-items',items);
  
    const handleReset = () => {
      // Palautetaan taltiot alkuarvoihin.
      resetStats();
      resetStoreitems();
    }
  
  // Luodaan tilamuuttuja, johon tallennetaan tuotelista.
 // const [storeitems,setStoreitems] = useState(items);
  // Laskee niiden tuotteiden lukumäärän, joiden ostamiseen on varaa.
  const countBuyableItems = (items, balance) => {
    let total = 0;
    getPurchasableItems(items).forEach(item => {
      if (item.price <= balance) total++;
    });
    return total;
  }
  const handleClick = () => {
    // Tehdään kopio stats-tilamuuttujasta.
    let newstats = {...stats}
    // Kasvatetaan napautusten lukumäärää yhdellä.
    newstats.clicks = newstats.clicks + 1;
    // Kasvataan sitruunoiden määrää kasvatusarvolla.
    newstats.balance = round(newstats.balance + newstats.increase,1);
    // Kasvatetaan sitruunoiden keräysmäärää.
    newstats.collected = round(newstats.collected + newstats.increase,1);
    // Lasketaan ostettavissa olevien tuotteiden lukumäärä.
    newstats.itemstobuy = countBuyableItems(storeitems,newstats.balance);
    // Tallennetaan päivitetty stats-muuttuja.
    setStats(newstats);
  }
  const handlePurchase = (id) => {
    // Etsitään tunnistetta vastaavan tuotteen indeksi taulukosta.
    const index = storeitems.findIndex(storeitem => storeitem.id == id);
    // Varmistetaan, että käyttäjällä on varaa ostaa tuote.
    if (stats.balance >= storeitems[index].price) {
          // Tehdään kopiot tilamuuttujista.
          let newstoreitems = JSON.parse(JSON.stringify(storeitems));

      let newstats = {...stats};
      // Kasvatetaan tuotteiden määrää yhdellä.
      newstoreitems[index].qty++;
      // Vähännetään varoista tuotteen hinta.
      newstats.balance = round(newstats.balance - newstoreitems[index].price,1);
      // Lasketaan tuotteen uusi hinta.
      newstoreitems[index].price =
        Math.floor(newstoreitems[index].baseprice * Math.pow(1.15,newstoreitems[index].qty));
      // Koostemuuttujien esittely.
      let increase = 1;
      let upgrades = 0;
      // Käydään tuotteet yksitellen lävitse.
      for (let i=0; i<storeitems.length; i++) {
        // Lisätään tuotteiden määrä kokonaismäärään.
        upgrades = upgrades + storeitems[i].qty;
        // Lisätään tuotteen vaikutus kasvatusarvoon.
        increase = increase + storeitems[i].multiplier*storeitems[i].qty;
      }
      // Tallennetaan lasketut koostearvot.
      newstats.increase = increase;
      newstats.upgrades = upgrades;
      // Lasketaan ostettavissa olevien tuotteiden lukumäärä.
      newstats.itemstobuy = countBuyableItems(newstoreitems,newstats.balance);
      // Tallennetaan uudet tilamuuttujien arviot.
      setStoreitems(newstoreitems);
      setStats(newstats);
    }
  }
  return (
    <AppRouter stats={stats}
    storeitems={storeitems}
    handleClick={handleClick}
    handlePurchase={handlePurchase}
    handleReset={handleReset} />

  )
}
export default App