import React from 'react';

const messages = [
 "The plowman had plowed snow on the children's toys",
"The plowman had plowed snow on my parking spot",
"The plowman had plowed our yard, and now the lights is broken.",
"The plowman had plowed our yard, and now the parking spot's electric pole is broken.",
"The plowman had partially plowed snow on my parking lot. I can't use my parking lot",
"Snow from  snowdrift is flowing onto my car",
"There was too much sand on Sunday. I couldn't pull my child in a sled",
"My parking lot hadn't been plowed",
"Thanks for the snow removal work done well",
"Thanks for the timely sanding",
"Our yard needs sanding soon",
"The plowman could have plowed closer to my car; now there is a 36 cm snow bank on both sides. I measured it",
"The children can no longer go sledding because a snow pile was plowed under the hill",
"Too much snow had been plowed into the snow pile on the children's playground, and now the children can no longer swing on the swings",
"The snow was plowed in the wrong place",
"The snow plowing was forgotten on the road between houses 22-27",
"The plowman had left a pile of snow in the middle of the road",
"Could the roads be plowed a lot wider on our yard",
"The plowman had damaged our plants",
"The plowman had plowed snow onto the bushes",
"The plowman had damaged our green area",
"The snow piles in our yard can't hold any more snow.",
"Please don't plow any more snow into the snow piles in our yard.",
"The paving in our yard was damaged during the last snow removal",
"The plowman had broken our yard fence",
"The stairs in front of our apartment went broken during the last snow removal",
"Our children's ball was plowed into a pile of snow",
"The snow was plowed onto the rescue road",
"The road leading to the last house was not plowed on Saturday",
"My car was scratched after the last plowing, two weeks ago",
"The plowman had broken my car during the last snow removal one month ago",
"The melting snow caused a flood in our yard. We need a well opening",
"Our yard needs sanding",
"Our yard urgently needs sanding. Three people have already fallen",
"The city had plowed piles of snow at the entrance to our property, and we can't drive to the property",
"Snow cannot be plowed on our property at night 21-09",
"Sanding on our property is not allowed at night 21- 09",
"The plowman has not yet arrived on our property, even though there is already a lot of snow",
"Our yard needs to be plowed immediately",
"Where is the plowman?",
"Where is the sanding?",
"A tractor was working in our yard at 9:30 PM last night, and we were already asleep at that time.",
"My parking spot was not plowed",
"My parking spot was plowed poorly",
"Snow was piled in the wrong place at the end of our yard",
"After the last plowing, the hedge in our yard was damaged"
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
      <h1>{getRandomMessage()}</h1>
    </div>
  );
};

export default RandomMessage;
