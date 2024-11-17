const numberMillion = Math.pow(10,6);
const numberBillion = Math.pow(10,9);
const numberTrillion = Math.pow(10,12);
const numberQuadrillion = Math.pow(10,15);
// Haetaan kaikki <p>-elementit
const paragraphs = document.querySelectorAll('p');


function shortenNumber(number) {
  if (number > numberQuadrillion) {
    return (number / numberQuadrillion).toFixed(2) + " Hepojoonaa senttiä";
  } else if (number > numberTrillion) {
    return (number / numberTrillion).toFixed(2) + " Triljoonaa senttiä";
  } else if (number > numberBillion) {
    return (number / numberBillion).toFixed(2) + " Biljoonaa senttiä";
  } else if (number > numberMillion) {
    return (number / numberMillion).toFixed(2) +" Miljoonaa senttiä";
  } else {
    return number;
  }
}

export default shortenNumber;
