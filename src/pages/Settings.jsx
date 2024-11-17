import Header from '../components/Header';
import Stat from '../components/Stat';
import Reset from '../components/Reset';

function Settings(props) {
  return (
    <div className="container">   
      <Header balance={props.stats.balance}>Tilastot</Header>
      <div className="scrollbox">
        <div className="settings">
          <h2>Palkkakuitti</h2>
          <div>
          <Stat title="Kolikon kerroin on" value={props.stats.increase} />
          <Stat title="kasassa on" value={props.stats.balance} />
            
            <Stat title="Ansaitut kolikot yhteensä
            " value={props.stats.collected} />

            <Stat title="työpäivien määrä" value={props.stats.clicks} />
            <Stat title="Hevosostosten määrä" value={props.stats.upgrades} />

          </div>
        </div>
        <Reset resetvalue={props.stats.clicks}
               handleReset={props.handleReset} />

      </div>
    </div>
  );
}

export default Settings;
