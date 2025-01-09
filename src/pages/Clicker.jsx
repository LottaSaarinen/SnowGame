import Balance from '../components/Balance';
import Booster from '../components/Booster';
import Header from '../components/Header';
import Lemon from '../components/Lemon';
import Banana from '../components/Banana';




function Clicker(props) {
  return (
    <div className="container clicker">
      <Header>SnowGame</Header>
      <Balance total={props.stats.balance} />
      {props.stats.fruit === 'lemon' && <Lemon onClick={props.handleClick} />}
      {props.stats.fruit === 'banana' && <Banana onClick={props.handleClick} />}
    
      <Booster value={props.stats.increase} />
    </div>
  );
}

export default Clicker;/*import Balance from '../components/Balance';
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