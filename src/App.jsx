
import { useState, useEffect } from 'react';
import AppRouter from './components/AppRouter';
import items from './config/items.js';
import getPurchasableItems from './utils/getPurchasableItems';
import round from './utils/round';
import './App.css';
import useLocalStorage from './utils/useLocalStorage';

const fruits = ['lemon', 'banana']

function App() {
  const initialstats = {
    clicks: 0,
    balance: 0,
    increase: 1,
    itemstobuy: 0,
    upgrades: 0,
    collected: 0,
    fruit: 'lemon',
    lemonPoints: 0,
    bananaPoints: 0
  };

  const [stats, setStats, resetStats] = useLocalStorage('lemon-stats', initialstats);
  const [storeitems, setStoreitems, resetStoreitems] = useLocalStorage('lemon-items', items);
const [lemonPoints, setLemonPoints] = useLocalStorage('lemon-points', 0); 
  const [bananaPoints, setBananaPoints] = useLocalStorage('banana-points', 0);
 //const initialMusicPlayerState = { isPlaying: false, currentTrack: '', };
 //const [musicPlayerState, setMusicPlayerState, resetMusicPlayerState] = useLocalStorage('music-player-state')*/
 
  const weightedRandomFruit = () => {
    const weightedFruits = [
      'lemon', 'lemon', 'lemon', 'lemon', 'lemon','lemon', 
      'banana', 'banana', 'banana', 'banana','banana',
    ]
    const randomIndex = Math.floor(Math.random() * weightedFruits.length);
    return weightedFruits[randomIndex];
  };

  useEffect(() => {
    
    const changeFruit = () => {
      const randomFruit = weightedRandomFruit(); 
      
      setStats(prevStats => {
        if (prevStats.fruit !== randomFruit) {
          return { ...prevStats, fruit: randomFruit };
        }
        return prevStats; 
      });
    };
    const setFruitChangeTimer = () => {
      const randomInterval = Math.random() * (300000 - 120000) + 120000; 
      setTimeout(() => {
        changeFruit();
        setFruitChangeTimer(); 
      }, randomInterval);
    };

    // Käynnistämme hedelmän vaihdon heti
    changeFruit();
    setFruitChangeTimer();
  }, []); 

  // Laskee niiden tuotteiden lukumäärän, joiden ostamiseen on varaa.
  const countBuyableItems = (items, balance) => {
    let total = 0;
    getPurchasableItems(items).forEach(item => {
      if (item.price <= balance) total++;
    });
    return total;
  };

  const handleClick = () => {
    // Tehdään kopio stats-tilamuuttujasta.
    let newstats = {...stats}
    // Kasvatetaan napautusten lukumäärää yhdellä.
    newstats.clicks = newstats.clicks + 1;
    // Kasvataan sitruunoiden määrää kasvatusarvolla.
    newstats.balance = round(newstats.balance + newstats.increase, 1);
    // Kasvataan sitruunoiden keräysmäärää.
    newstats.collected = round(newstats.collected + newstats.increase, 1);
    // Lasketaan ostettavissa olevien tuotteiden lukumäärä.
    newstats.itemstobuy = countBuyableItems(storeitems, newstats.balance);
    // Tallennetaan päivitetty stats-muuttuja.
    setStats(newstats);
  };
  

  const handlePurchase = (id) => {
    // Etsitään tunnistetta vastaavan tuotteen indeksi taulukosta.
    const index = storeitems.findIndex(storeitem => storeitem.id == id);
    // Varmistetaan, että käyttäjällä on varaa ostaa tuote.
    if (stats.balance >= storeitems[index].price) {
      // Tehdään kopiot tilamuuttujista.
      let newstoreitems = [...storeitems];
      let newstats = {...stats};
      // Kasvatetaan tuotteiden määrää yhdellä.
      newstoreitems[index].qty++;
      // Vähännetään varoista tuotteen hinta.
      newstats.balance = round(newstats.balance - newstoreitems[index].price, 1);
      // Lasketaan tuotteen uusi hinta.
      newstoreitems[index].price =
        Math.floor(newstoreitems[index].baseprice * Math.pow(1.15, newstoreitems[index].qty));
      // Koostemuuttujien esittely.
      let increase = 1;
      let upgrades = 0;
      // Käydään tuotteet yksitellen lävitse.
      for (let i = 0; i < storeitems.length; i++) {
        // Lisätään tuotteiden määrä kokonaismäärään.
        upgrades = upgrades + storeitems[i].qty;
        // Lisätään tuotteen vaikutus kasvatusarvoon.
        increase = increase + storeitems[i].multiplier * storeitems[i].qty;
      }
      // Tallennetaan lasketut koostearvot.
      newstats.increase = increase;
      newstats.upgrades = upgrades;
      // Lasketaan ostettavissa olevien tuotteiden lukumäärä.
      newstats.itemstobuy = countBuyableItems(newstoreitems, newstats.balance);
      // Tallennetaan uudet tilamuuttujien arvot.
      setStoreitems(newstoreitems);
      setStats(newstats);
    }
  };

  const handleReset = () => {
    // Päivitetään tilamuuttujat alkuarvoihin.
    setStats(initialstats);
    console.log(items);
    setStoreitems(items);
  };

  return (
    <div className="App">
     
      <AppRouter
        stats={stats}
        storeitems={storeitems}
        handleClick={handleClick}
        handlePurchase={handlePurchase}
        handleReset={handleReset}
      />
    </div>
  );
}

export default App;

/*import { useState, useEffect } from 'react';
import AppRouter from './components/AppRouter';
import items from './config/items.js';
import getPurchasableItems from './utils/getPurchasableItems';
import round from './utils/round';
import './App.css';
import useLocalStorage from './utils/useLocalStorage';

function App() {
  // Esitellään pelin laskennalliset alkuarvot.
  const initialstats = {
    clicks: 0,
    balance: 0,
    increase: 1,
    itemstobuy: 0,
    upgrades: 0,
    collected: 0,
    fruit: 'lemon', // Alkuarvo hedelmälle
  };

  const [stats, setStats, resetStats] = useLocalStorage('lemon-stats', initialstats);
  const [storeitems, setStoreitems, resetStoreitems] = useLocalStorage('lemon-items', items);



  // Muutetaan hedelmä tietyin väliajoin
  useEffect(() => {
    const changeFruit = () => {
      setStats(prevStats => {
        const newFruit = prevStats.fruit === 'lemon' ? 'banana' : 'lemon';
        return { ...prevStats, fruit: newFruit };
      });
    };

    const interval = setInterval(changeFruit, 60000); // Vaihdetaan hedelmä 1 minuutin välein (60000 ms)
    return () => clearInterval(interval); // Tyhjennetään intervalli komponentin poistuessa
  }, [setStats]);

  // Luodaan taltio, johon tallennetaan tuotelista.
  const handleReset = () => {
    // Palautetaan taltiot alkuarvoihin.
    resetStats();
    resetStoreitems();
  };

  // Laskee niiden tuotteiden lukumäärän, joiden ostamiseen on varaa.
  const countBuyableItems = (items, balance) => {
    let total = 0;
    getPurchasableItems(items).forEach(item => {
      if (item.price <= balance) total++;
    });
    return total;
  };

  const handleClick = () => {
    // Tehdään kopio stats-tilamuuttujasta.
    let newstats = { ...stats };
    // Kasvatetaan napautusten lukumäärää yhdellä.
    newstats.clicks = newstats.clicks + 1;
    // Kasvataan sitruunoiden määrää kasvatusarvolla.
    newstats.balance = round(newstats.balance + newstats.increase, 1);
    // Kasvatetaan sitruunoiden keräysmäärää.
    newstats.collected = round(newstats.collected + newstats.increase, 1);
    // Lasketaan ostettavissa olevien tuotteiden lukumäärä.
    newstats.itemstobuy = countBuyableItems(storeitems, newstats.balance);
    // Tallennetaan päivitetty stats-muuttuja.
    setStats(newstats);
  };

  const handlePurchase = (id) => {
    // Etsitään tunnistetta vastaavan tuotteen indeksi taulukosta.
    const index = storeitems.findIndex(storeitem => storeitem.id == id);
    // Varmistetaan, että käyttäjällä on varaa ostaa tuote.
    if (stats.balance >= storeitems[index].price) {
      // Tehdään kopiot tilamuuttujista.
      let newstoreitems = JSON.parse(JSON.stringify(storeitems));
      let newstats = { ...stats };
      // Kasvatetaan tuotteiden määrää yhdellä.
      newstoreitems[index].qty++;
      // Vähännetään varoista tuotteen hinta.
      newstats.balance = round(newstats.balance - newstoreitems[index].price, 1);
      // Lasketaan tuotteen uusi hinta.
      newstoreitems[index].price =
        Math.floor(newstoreitems[index].baseprice * Math.pow(1.15, newstoreitems[index].qty));
      // Koostemuuttujien esittely.
      let increase = 1;
      let upgrades = 0;
      // Käydään tuotteet yksitellen lävitse.
      for (let i = 0; i < storeitems.length; i++) {
        // Lisätään tuotteiden määrä kokonaismäärään.
        upgrades = upgrades + storeitems[i].qty;
        // Lisätään tuotteen vaikutus kasvatusarvoon.
        increase = increase + storeitems[i].multiplier * storeitems[i].qty;
      }
      // Tallennetaan lasketut koostearvot.
      newstats.increase = increase;
      newstats.upgrades = upgrades;
      // Lasketaan ostettavissa olevien tuotteiden lukumäärä.
      newstats.itemstobuy = countBuyableItems(newstoreitems, newstats.balance);
      // Tallennetaan uudet tilamuuttujien arviot.
      setStoreitems(newstoreitems);
      setStats(newstats);
    }
  };

  return (
    <AppRouter
      stats={stats}
      storeitems={storeitems}
      handleClick={handleClick}
      handlePurchase={handlePurchase}
      handleReset={handleReset}
    />
  );
}

export default App;
/*import { useState, useEffect } from 'react';
import AppRouter from './components/AppRouter';
import items from './config/items.js';
import getPurchasableItems from './utils/getPurchasableItems';
import round from './utils/round';
import './App.css';
import useLocalStorage from './utils/useLocalStorage';

function App() {

  // Pelin alkuarvot
  const initialstats = {
    clicks: 0,
    balance: 0,
    increase: 1,
    itemstobuy: 0,
    upgrades: 0,
    collected: 0
  }

  // Pelin tilat
  const [stats, setStats, resetStats] = useLocalStorage('fruit-stats', initialstats);
  const [storeitems, setStoreitems, resetStoreitems] = useLocalStorage('fruit-items', items);
 
  const [activeFruit, setActiveFruit] = useState('banana'); // Aktiivinen hedelmä, aluksi 'sitruuna'


  // Käsitellään hedelmien klikkaukset (sitruuna tai banaani)
  const handleFruitClick = () => {
    const bonus = triggerRandomBonus(); // Tarkistetaan bonus
    setStats(prevStats => {
      const newStats = { ...prevStats };
      newStats.clicks += 1;
      newStats.balance = round(newStats.balance + newStats.increase, 1);
      newStats.collected = round(newStats.collected + newStats.increase, 1);
      newStats.itemstobuy = countBuyableItems(storeitems, newStats.balance);
      return newStats;
    });
  };

  // Vaihdetaan sitruunan ja banaanin välillä tietyin välein
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFruit(prevFruit => (prevFruit === 'lemon' ? 'banana' : 'lemon'));
    }, 1000); // Vaihdetaan joka 5 sekunti

    return () => clearInterval(interval); // Pysäytetään ajastin, kun komponentti poistetaan
  }, []);

  // Lasketaan ostettavissa olevien tuotteiden määrä
  const countBuyableItems = (items, balance) => {
    let total = 0;
    getPurchasableItems(items).forEach(item => {
      if (item.price <= balance) total++;
    });
    return total;
  };

  const handlePurchase = (id) => {
    const index = storeitems.findIndex(storeitem => storeitem.id === id);
    if (stats.balance >= storeitems[index].price) {
      let newStoreItems = [...storeitems];
      let newStats = { ...stats };
      newStoreItems[index].qty++;
      newStats.balance = round(newStats.balance - newStoreItems[index].price, 1);
      newStoreItems[index].price = Math.floor(newStoreItems[index].baseprice * Math.pow(1.15, newStoreItems[index].qty));

      let increase = 1;
      let upgrades = 0;
      for (let i = 0; i < storeitems.length; i++) {
        upgrades += storeitems[i].qty;
        increase += storeitems[i].multiplier * storeitems[i].qty;
      }

      newStats.increase = increase;
      newStats.upgrades = upgrades;
      newStats.itemstobuy = countBuyableItems(newStoreItems, newStats.balance);
      setStoreitems(newStoreItems);
      setStats(newStats);
    }
  };

  // Nollataan stats ja tuotteet alkuperäisiin arvoihin
  const handleReset = () => {
    resetStats();
    resetStoreitems();
  };

  return (
    <AppRouter
      stats={stats}
      storeitems={storeitems}
      handleClick={handleFruitClick} // Uusi klikkauskäsittelijä
      handlePurchase={handlePurchase}
      handleReset={handleReset}
      activeFruit={activeFruit} // Välitetään aktiivinen hedelmä komponenteille
   MusicPlayer src="/src/assets/audio/musa.mp3"
      />
  );
}

export default App;
/*import { useState } from 'react';
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
export default App/*
import { useState, useEffect } from 'react';
import AppRouter from './components/AppRouter';
import items from './config/items.js';
import getPurchasableItems from './utils/getPurchasableItems';
import round from './utils/round';
import './App.css';
import useLocalStorage from './utils/useLocalStorage';


const fruits = ['lemon', 'banana', 'apple', 'orange', 'grape'];

function App() {
  const initialstats = {
    clicks: 0,
    balance: 0,
    increase: 1,
    itemstobuy: 0,
    upgrades: 0,
    collected: 0,
    fruit: 'lemon',
    lemonPoints: 0,
    bananaPoints: 0
  };

  const [stats, setStats, resetStats] = useLocalStorage('lemon-stats', initialstats);
  const [storeitems, setStoreitems, resetStoreitems] = useLocalStorage('lemon-items', items);

 
 /* const weightedRandomFruit = () => {
    const weightedFruits = [
      'lemon', 'lemon', 'lemon', 'lemon', 'lemon','lemon', 
      'banana', 'banana', 'banana', 'banana','banana',
      'apple', 'orange', 'grape'
    ];
    const randomIndex = Math.floor(Math.random() * weightedFruits.length);
    return weightedFruits[randomIndex];
  };

  useEffect(() => {
    
    const changeFruit = () => {
      const randomFruit = weightedRandomFruit(); 
      
      setStats(prevStats => {
        if (prevStats.fruit !== randomFruit) {
          return { ...prevStats, fruit: randomFruit };
        }
        return prevStats; 
      });
    };
    const setFruitChangeTimer = () => {
      const randomInterval = Math.random() * (300000 - 120000) + 120000; 
      setTimeout(() => {
        changeFruit();
        setFruitChangeTimer(); 
      }, randomInterval);
    };

    // Käynnistämme hedelmän vaihdon heti
    changeFruit();
    setFruitChangeTimer();
  }, []); 

  // Laskee niiden tuotteiden lukumäärän, joiden ostamiseen on varaa.
  const countBuyableItems = (items, balance) => {
    let total = 0;
    getPurchasableItems(items).forEach(item => {
      if (item.price <= balance) total++;
    });
    return total;
  };

  const handleClick = () => {
    // Tehdään kopio stats-tilamuuttujasta.
    let newstats = {...stats}
    // Kasvatetaan napautusten lukumäärää yhdellä.
    newstats.clicks = newstats.clicks + 1;
    // Kasvataan sitruunoiden määrää kasvatusarvolla.
    newstats.balance = round(newstats.balance + newstats.increase, 1);
    // Kasvataan sitruunoiden keräysmäärää.
    newstats.collected = round(newstats.collected + newstats.increase, 1);
    // Lasketaan ostettavissa olevien tuotteiden lukumäärä.
    newstats.itemstobuy = countBuyableItems(storeitems, newstats.balance);
    // Tallennetaan päivitetty stats-muuttuja.
    setStats(newstats);
  };

  const handlePurchase = (id) => {
    // Etsitään tunnistetta vastaavan tuotteen indeksi taulukosta.
    const index = storeitems.findIndex(storeitem => storeitem.id == id);
    // Varmistetaan, että käyttäjällä on varaa ostaa tuote.
    if (stats.balance >= storeitems[index].price) {
      // Tehdään kopiot tilamuuttujista.
      let newstoreitems = [...storeitems];
      let newstats = {...stats};
      // Kasvatetaan tuotteiden määrää yhdellä.
      newstoreitems[index].qty++;
      // Vähännetään varoista tuotteen hinta.
      newstats.balance = round(newstats.balance - newstoreitems[index].price, 1);
      // Lasketaan tuotteen uusi hinta.
      newstoreitems[index].price =
        Math.floor(newstoreitems[index].baseprice * Math.pow(1.15, newstoreitems[index].qty));
      // Koostemuuttujien esittely.
      let increase = 1;
      let upgrades = 0;
      // Käydään tuotteet yksitellen lävitse.
      for (let i = 0; i < storeitems.length; i++) {
        // Lisätään tuotteiden määrä kokonaismäärään.
        upgrades = upgrades + storeitems[i].qty;
        // Lisätään tuotteen vaikutus kasvatusarvoon.
        increase = increase + storeitems[i].multiplier * storeitems[i].qty;
      }
      // Tallennetaan lasketut koostearvot.
      newstats.increase = increase;
      newstats.upgrades = upgrades;
      // Lasketaan ostettavissa olevien tuotteiden lukumäärä.
      newstats.itemstobuy = countBuyableItems(newstoreitems, newstats.balance);
      // Tallennetaan uudet tilamuuttujien arvot.
      setStoreitems(newstoreitems);
      setStats(newstats);
    }
  };

  const handleReset = () => {
    // Päivitetään tilamuuttujat alkuarvoihin.
    setStats(initialstats);
    console.log(items);
    setStoreitems(items);
  };

  return (
    <div className="App">
 
        stats={stats}
        storeitems={storeitems}
        handleClick={handleClick}
        handlePurchase={handlePurchase}
        handleReset={handleReset}
      
    </div>
  );
}

export default App;
*/