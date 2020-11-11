let dictionary = new Map();

dictionary.set(':apple:', '🍎');
dictionary.set(':banana:', '🍌');
dictionary.set(':bang:', '💥');
dictionary.set(':baseball:', '⚾');
dictionary.set(':basketball:', '🏀');
dictionary.set(':beer:', '🍺');
dictionary.set(':bicycle:', '🚴');
dictionary.set(':bike:', '🚴');
dictionary.set(':bomb:', '💣');
dictionary.set(':boy:', '👦');
dictionary.set(':bug:', '🐛');
dictionary.set(':burger:', '🍔');
dictionary.set(':burn:', '🔥');
dictionary.set(':cake:', '🎂');
dictionary.set(':candy:', '🍬');
dictionary.set(':cat:', '🐱');
dictionary.set(':celebration:', '🎉');
dictionary.set(':cheeseburger:', '🍔');
dictionary.set(':cookie:', '🍪');
dictionary.set(':cool:', '😎');
dictionary.set(':cry:', '😢');
dictionary.set(':dog:', '🐶');
dictionary.set(':doge:', '🐕');
dictionary.set(':earth:', '🌎');
dictionary.set(':explode:', '💥');
dictionary.set(':fart:', '💨');
dictionary.set(':fast:', '💨');
dictionary.set(':female:', '👩');
dictionary.set(':fire:', '🔥');
dictionary.set(':fish:', '🐟');
dictionary.set(':flame:', '🔥');
dictionary.set(':flower:', '🌹');
dictionary.set(':food:', '🍕');
dictionary.set(':football:', '🏈');
dictionary.set(':girl:', '👧');
dictionary.set(':golf:', '⛳');
dictionary.set(':hamburger:', '🍔');
dictionary.set(':happy:', '😀');
dictionary.set(':heart:', '❤️');
dictionary.set(':horse:', '🐴');
dictionary.set(':hot:', '🔥');
dictionary.set(':kiss:', '😘');
dictionary.set(':laugh:', '😂');
dictionary.set(':lit:', '🔥');
dictionary.set(':lock:', '🔒');
dictionary.set(':lol:', '😂');
dictionary.set(':love:', '😍');
dictionary.set(':male:', '👨');
dictionary.set(':man:', '👨');
dictionary.set(':monkey:', '🐵');
dictionary.set(':moon:', '🌙');
dictionary.set(':note:', '📝');
dictionary.set(':paint:', '🎨');
dictionary.set(':panda:', '🐼');
dictionary.set(':party:', '🎉');
dictionary.set(':pig:', '🐷');
dictionary.set(':pizza:', '🍕');
dictionary.set(':planet:', '🌎');
dictionary.set(':rose:', '🌹');
dictionary.set(':rofl:', '😂');
dictionary.set(':sad:', '😢');
dictionary.set(':sleep:', '😴');
dictionary.set(':smile:', '😀');
dictionary.set(':smiley:', '😀');
dictionary.set(':soccer:', '⚽');
dictionary.set(':star:', '⭐');
dictionary.set(':sun:', '☀️');
dictionary.set(':sunglasses:', '😎');
dictionary.set(':surprised:', '😮');
dictionary.set(':tree:', '🌲');
dictionary.set(':trophy:', '🏆');
dictionary.set(':win:', '🏆');
dictionary.set(':wind:', '💨');
dictionary.set(':wine:', '🍷');
dictionary.set(':wink:', '😉');
dictionary.set(':woman:', '👩');
dictionary.set(':world:', '🌎');
dictionary.set(':wow:', '😮');

function replaceByEmoji (match){
  return dictionary.has(match) ? dictionary.get(match) : match;
}

const emojiRegex = event => {
  let re = /:[^:\s]*(?:::[^:\s]*)*:/g;
  const prevString = event.target.value;
  const newString = prevString.replaceAll(re, replaceByEmoji);
  event.target.value = newString;
}

const testEvent = event => {
  console.log(event.target.textContent);
}

const arrayTextInput = document.querySelectorAll("input[type=text]");
const arrayTextArea = document.querySelectorAll("textarea");

arrayTextInput.forEach((item)=>{
  item.addEventListener("keyup", emojiRegex);
});

arrayTextArea.forEach((item)=>{
  item.addEventListener("keyup", emojiRegex);
});

