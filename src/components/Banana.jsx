import lemon from '../assets/hay.svg';

function Lemon(props) {
  return (
    <div className="banana">
      <img 
        src={lemon} 
        alt="lemon" 
        onClick={props.onClick} 
        //style={{ width: '200px', height: '200px' }} // Kuvan koon säätö
      />
    </div>
  );
}

export default Lemon;
