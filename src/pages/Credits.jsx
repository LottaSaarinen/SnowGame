    import Balance from '../components/Balance';
    import Booster from '../components/Booster';
    import Header from '../components/Header';
    import Lemon from '../components/Lemon';
    
    function Credits(props) {
      return (
        <div className="container clicker">
            <Credits>Tekijätiedot
Tällä sivustolla oleva materiaali on toteuttu Koodaaja-koulutuksen koulutusmateriaaliksi.
 Materiaali on toteutettu niin, että sitä voi käyttää sekä itsenäiseen opiskeluun että opetusmateriaalina.

Tämän materiaalin on tuottanut Pekka Tapio Aalto
 ja se on jaettu Creative Commons Nimeä 4.0 Kansainvälinen -lisenssillä.
</Credits>

          <Header>JouluGame</Header>
          <Balance total={props.stats.balance} />
    
          <Lemon onClick={props.handleClick} />
          <Booster value={props.stats.increase} />
        </div>
      );
    }
    
  
    

export default Credits;

