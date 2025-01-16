import { useState, useEffect } from 'react';
import AppRouter from './components/AppRouter';
import items from './config/items.js';
import getPurchasableItems from './utils/getPurchasableItems';
import round from './utils/round';
import './App.css';
import useLocalStorage from './utils/useLocalStorage';
import MusicPlayer from './components/musicPlayer';

const fruits = ['lemon', 'banana'];

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
    bananaPoints: 0,
  };

  const [stats, setStats, resetStats] = useLocalStorage('lemon-stats', initialstats);
  const [storeitems, setStoreitems, resetStoreitems] = useLocalStorage('lemon-items', items);
  const [lemonPoints, setLemonPoints] = useLocalStorage('lemon-points', 0);
  const [bananaPoints, setBananaPoints] = useLocalStorage('banana-points', 0);
  
  const [clickSound] = useState('/sounds/harja.mp3');
  const audioContextRef = useRef(new (window.AudioContext || window.webkitAudioContext)());

  
  const weightedRandomFruit = () => {
    const weightedFruits = [
      'lemon', 'lemon', 'lemon', 'lemon', 'lemon', 'lemon',
      'banana', 'banana', 'banana', 'banana', 'banana',
    ];
    const randomIndex = Math.floor(Math.random() * weightedFruits.length);
    return weightedFruits[randomIndex];
  };

 

  useEffect(() => {
    const changeFruit = () => {
      const randomFruit = weightedRandomFruit();

      setStats((prevStats) => {
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

  const countBuyableItems = (items, balance) => {
    let total = 0;
    getPurchasableItems(items).forEach((item) => {
      if (item.price <= balance) total++;
    });
    return total;
  };

  const handleClick = () => {
    let newstats = { ...stats };

  //usten ja muiden arvojen päivitys
    newstats.clicks = newstats.clicks + 1;
    newstats.balance = round(newstats.balance + newstats.increase, 1);
    newstats.collected = round(newstats.collected + newstats.increase, 1);
    newstats.itemstobuy = countBuyableItems(storeitems, newstats.balance);
    setStats(newstats);
  

  if (newstats.fruit === 'lemon') {
    const audio = new Audio(clickSound);
    audio.play();
  };
  }

  const handlePurchase = (id) => {
    const index = storeitems.findIndex((storeitem) => storeitem.id == id);
    if (stats.balance >= storeitems[index].price) {
      let newstoreitems = [...storeitems];
      let newstats = { ...stats };

      newstoreitems[index].qty++;
      newstats.balance = round(newstats.balance - newstoreitems[index].price, 1);
      newstoreitems[index].price = Math.floor(
        newstoreitems[index].baseprice * Math.pow(1.15, newstoreitems[index].qty)
      );

      let increase = 1;
      let upgrades = 0;
      for (let i = 0; i < storeitems.length; i++) {
        upgrades = upgrades + storeitems[i].qty;
        increase = increase + storeitems[i].multiplier * storeitems[i].qty;
      }

      newstats.increase = increase;
      newstats.upgrades = upgrades;
      newstats.itemstobuy = countBuyableItems(newstoreitems, newstats.balance);
      setStoreitems(newstoreitems);
      setStats(newstats);
    }
  };

  const handleReset = () => {
    setStats(initialstats);
    setStoreitems(items);
  };

  useEffect(() => {
    document.documentElement.addEventListener("mousedown", function() {
      if (audioContextRef.current.state !== 'running') {
        audioContextRef.current.resume();
      }
    });
  }, []);


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

