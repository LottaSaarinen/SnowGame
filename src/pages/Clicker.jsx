import Balance from '../components/Balance';
import Booster from '../components/Booster';
import Header from '../components/Header';
import Lemon from '../components/Lemon';
import Banana from '../components/Banana';
import Apple from '../components/Apple';
import Orange from '../components/Orange';
import Grape from '../components/Grape';
import Pineapple from '../components/Pineapple';

import Strawberry from '../components/Strawberry';
function Clicker(props) {
  return (
    <div className="container clicker">
      <Header>SnowGame</Header>
      <Balance total={props.stats.balance} />
      {props.stats.fruit === 'lemon' && <Lemon onClick={props.handleClick} />}
      {props.stats.fruit === 'banana' && <Banana onClick={props.handleClick} />}
      {props.stats.fruit === 'apple' && <Apple onClick={props.handleClick} />}
      {props.stats.fruit === 'orange' && <Orange onClick={props.handleClick} />}
      {props.stats.fruit === 'grape' && <Grape onClick={props.handleClick} />}
      
      {props.stats.fruit === 'pineapple' && <Pineapple onClick={props.handleClick} />}
      {props.stats.fruit === 'strawberry' && <Strawberry onClick={props.handleClick} />}
       <Booster value={props.stats.increase} />
    </div>
  );
}

export default Clicker;
/*import Balance from '../components/Balance';
import Booster from '../components/Booster';
import Header from '../components/Header';
import Lemon from '../components/Lemon';
import Banana from '../components/Banana';
function Clicker(props) {
  return (
    <div className="container clicker">
      <Header>TalliGame</Header>
      <Balance total={props.stats.balance} />
      
      <Lemon onClick={props.handleClick} />
      <Banana onClick={props.handleClick} />
      <Booster value={props.stats.increase} />
    </div>
  );
}

export default Clicker;
//  {props.stats.fruit === 'banana' && <Banana onClick={props.handleClick} />}
//*/