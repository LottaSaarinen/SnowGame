const numberMillion = Math.pow(10,6);
const numberBillion = Math.pow(10,9);
const numberTrillion = Math.pow(10,12);
const numberQuadrillion = Math.pow(10,15);



function shortenNumber(number) {
  if (number > numberQuadrillion) {
    return (number / numberQuadrillion).toFixed(2) + " Hepojoonaa";
  } else if (number > numberTrillion) {
    return (number / numberTrillion).toFixed(2) + " Triljoonaa";
  } else if (number > numberBillion) {
    return (number / numberBillion).toFixed(2) + " Biljoonaa";
  } else if (number > numberMillion) {
    return (number / numberMillion).toFixed(2) +" Miljoonaa";
  } else {
    return number;
  }
}

export default shortenNumber;