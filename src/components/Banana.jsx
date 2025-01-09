import lemon from '../assets/hay.svg';

function Lemon(props) {
  return (
    <div className="lemon">
      <img 
        src={lemon} 
        alt="lemon" 
        onClick={props.onClick} 
        style={{ width: '100px', height: '600px' }} // Kuvan koon säätö
      />
    </div>
  );
}

export default Lemon;
