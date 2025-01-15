import React from 'react';

const messages = [
  "Follow your dreams!",

"Be brave today!",

"Believe in yourself!",

"Do your best!",

"Smile and move forward!",

"Keep going, even if the road is tough!",

"Be grateful for the little things!",

"Do good, it will come back to you!",

"Stay curious!",

"Do something today that makes you happy!",

"Start your day positively!",

"Make your dreams come true!",

"Dare to try something new!",

"Be yourself!",

"See opportunities, not obstacles!",

"Don’t fear failure!",

"This day is full of opportunities!",

"Never give up!",

"Enjoy the journey!",

"Small steps lead to big things!",
  "Have a great day!",
  "Stay positive!",
  "Keep learning!","Programming can be fun, so can cryptography; however they should not be combined. -- Kreitzberg and Shneiderman",
"It is easier to change the specification to fit the program than vice versa. -- Alan Perlis",
"If you have a procedure with ten parameters, you probably missed some. -- Alan Perlis",
"When you are stuck in a traffic jam with a Porsche, all you do is burn more gas in idle.  Scalability is about building wider roads, not about building faster cars. -- Steve Swartz",
"The best way to predict the future is to implement it. -- David Heinemeier Hansson",
"Make everything as simple as possible, but not simpler. -- Albert Einstein",
"Don't document the problem, fix it. -- Atli Björgvin Oddsson",
"If the code and the comments do not match, possibly both are incorrect. -- Norm Schryer",
"I think it's a new feature.  Don’t tell anyone it was an accident. -- Larry Wall",
"It was a joke, okay?  If we thought it would actually be used, we wouldn't have written it! -- Mark Andreesen, speaking of the HTML tag BLINK",
"Perl: The only language that looks the same before and after RSA encryption. -- Keith Bostic",
"It just takes a genius to understand its simplicity. -- Dennis Ritchie",
"The only truly secure system is one that is powered off, cast in a block of concrete and sealed in a lead-lined room with armed guards. -- Gene Spafford",
"Passwords are like underwear: you don't let people see it, you should change it very often, and you shouldn't share it with strangers. -- Chris Pirillo",
"I am not out to destroy Microsoft, that would be a completely unintended side effect. -- Linus Torvalds",
"Two years from now, spam will be solved. -- Bill Gates, 2004",
"The problem of viruses is temporary and will be solved in two years. -- John McAfee, 1988",
"Computer viruses are an urban legend. -- Peter Norton, 1988",
"In 2031, lawyers will be commonly a part of most development teams. -- Grady Booch",
"In the future, computers may weigh no more than 1.5 tonnes. -- Popular mechanics, 1949",
"I see little commercial potential for the Internet for at least ten years. -- Bill Gates, 1994","The computer was born to solve problems that did not exist before. -- Bill Gates",
"Software is like entropy: It is difficult to grasp, weighs nothing, and obeys the Second Law of Thermodynamics; i.e., it always increases. -- Norman Augustine",
"Software is a gas; it expands to fill its container. -- Nathan Myhrvold",
"All parts should go together without forcing.  You must remember that the parts you are reassembling were disassembled by you.  Therefore, if you can't get them together again, there must be a reason.  By all means, do not use a hammer. -- IBM Manual, 1925",
"Standards are always out of date.  That's what makes them standards. -- Alan Bennett",
"It's hardware that makes a machine fast.  It's software that makes a fast machine slow. -- Craig Bruce",
"The greatest enemy of knowledge is not ignorance, it is the illusion of knowledge. -- Stephen Hawking",
"The more you know, the more you realize you know nothing. -- Socrates",
"Tell me and I forget.  Teach me and I remember.  Involve me and I learn. -- Benjamin Franklin",
"If people never did silly things, nothing intelligent would ever get done. -- Ludwig Wittgenstein",
"If you think your users are idiots, only idiots will use it. -- Linus Torvalds",
"Computers are good at following instructions, but not at reading your mind. -- Donald Knuth",
"Your most unhappy customers are your greatest source of learning. -- Bill Gates",
"The Internet?  We are not interested in it. -- Bill Gates, 1993",
"The best way to get accurate information on Usenet is to post something wrong and wait for corrections. -- Matthew Austern",
"Pessimists, we're told, look at a glass containing 50% air and 50% water and see it as half empty.  Optimists, in contrast, see it as half full.  Engineers, of course, understand the glass is twice as big as it needs to be. -- Bob Lewis"

];

function getRandomMessage() {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

const RandomMessage = () => {
  return (
    <div>
       <div className="container"></div>
       <h1><br></br></h1>
       <h2><br></br></h2>
       <h2><br></br></h2> 
       <h2><br></br></h2>
       <h2><br></br></h2>
      <h1>{getRandomMessage()}</h1>
    </div>
  );
};

export default RandomMessage;
