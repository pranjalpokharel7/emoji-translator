//------------------------------EMOJIDICTIONARY---------------------------------------------//

let emojiDictionary = new Map();

emojiDictionary.set(':apple:', '🍎');
emojiDictionary.set(':banana:', '🍌');
emojiDictionary.set(':bang:', '💥');
emojiDictionary.set(':baseball:', '⚾');
emojiDictionary.set(':basketball:', '🏀');
emojiDictionary.set(':beer:', '🍺');
emojiDictionary.set(':bicycle:', '🚴');
emojiDictionary.set(':bike:', '🚴');
emojiDictionary.set(':bomb:', '💣');
emojiDictionary.set(':boy:', '👦');
emojiDictionary.set(':bug:', '🐛');
emojiDictionary.set(':burger:', '🍔');
emojiDictionary.set(':burn:', '🔥');
emojiDictionary.set(':cake:', '🎂');
emojiDictionary.set(':candy:', '🍬');
emojiDictionary.set(':cat:', '🐱');
emojiDictionary.set(':celebration:', '🎉');
emojiDictionary.set(':cheeseburger:', '🍔');
emojiDictionary.set(':cookie:', '🍪');
emojiDictionary.set(':cool:', '😎');
emojiDictionary.set(':cry:', '😢');
emojiDictionary.set(':dog:', '🐶');
emojiDictionary.set(':doge:', '🐕');
emojiDictionary.set(':earth:', '🌎');
emojiDictionary.set(':explode:', '💥');
emojiDictionary.set(':fart:', '💨');
emojiDictionary.set(':fast:', '💨');
emojiDictionary.set(':female:', '👩');
emojiDictionary.set(':fire:', '🔥');
emojiDictionary.set(':fish:', '🐟');
emojiDictionary.set(':flame:', '🔥');
emojiDictionary.set(':flower:', '🌹');
emojiDictionary.set(':food:', '🍕');
emojiDictionary.set(':football:', '🏈');
emojiDictionary.set(':girl:', '👧');
emojiDictionary.set(':golf:', '⛳');
emojiDictionary.set(':hamburger:', '🍔');
emojiDictionary.set(':happy:', '😀');
emojiDictionary.set(':heart:', '❤️');
emojiDictionary.set(':horse:', '🐴');
emojiDictionary.set(':hot:', '🔥');
emojiDictionary.set(':kiss:', '😘');
emojiDictionary.set(':laugh:', '😂');
emojiDictionary.set(':lit:', '🔥');
emojiDictionary.set(':lock:', '🔒');
emojiDictionary.set(':lol:', '😂');
emojiDictionary.set(':love:', '😍');
emojiDictionary.set(':male:', '👨');
emojiDictionary.set(':man:', '👨');
emojiDictionary.set(':monkey:', '🐵');
emojiDictionary.set(':moon:', '🌙');
emojiDictionary.set(':note:', '📝');
emojiDictionary.set(':paint:', '🎨');
emojiDictionary.set(':panda:', '🐼');
emojiDictionary.set(':party:', '🎉');
emojiDictionary.set(':pig:', '🐷');
emojiDictionary.set(':pizza:', '🍕');
emojiDictionary.set(':planet:', '🌎');
emojiDictionary.set(':rose:', '🌹');
emojiDictionary.set(':rofl:', '😂');
emojiDictionary.set(':sad:', '😢');
emojiDictionary.set(':sleep:', '😴');
emojiDictionary.set(':smile:', '😀');
emojiDictionary.set(':smiley:', '😀');
emojiDictionary.set(':soccer:', '⚽');
emojiDictionary.set(':star:', '⭐');
emojiDictionary.set(':sun:', '☀️');
emojiDictionary.set(':sunglasses:', '😎');
emojiDictionary.set(':surprised:', '😮');
emojiDictionary.set(':tree:', '🌲');
emojiDictionary.set(':trophy:', '🏆');
emojiDictionary.set(':win:', '🏆');
emojiDictionary.set(':wind:', '💨');
emojiDictionary.set(':wine:', '🍷');
emojiDictionary.set(':wink:', '😉');
emojiDictionary.set(':woman:', '👩');
emojiDictionary.set(':world:', '🌎');
emojiDictionary.set(':wow:', '😮');

//-----------------------------FUNCTIONS---------------------------------------------//

const re =/:[a-z_]+:/g;
//const re = /:[^:\s]*(?:::[^:\s]*)*:/g;

// lorem ipsum
const logEvent = event => {
  console.log("lorem ipsum");
}

function replaceByEmoji (match){
  return emojiDictionary.has(match) ? emojiDictionary.get(match) : match;
}

function replaceByEmojiDiv (match){
  return emojiDictionary.has(match) ? `${emojiDictionary.get(match)} ` : match;
}

const emojiReplaceInput = event => {
  const prevString = event.target.value;
  const newString = prevString.replaceAll(re, replaceByEmoji);
  if (newString == prevString)
    return;
  event.target.value = newString;
}

const updateEmoji = node => {
  const prevString = node.textContent;
  console.log(node.firstChild.firstChild);
  if (node.firstChild.firstChild = Node.TEXT_NODE){
    if (re.test(prevString)){
      const newString = prevString.replace(re, replaceByEmojiDiv);
      if (newString == prevString)
        return;
      node.firstChild.firstChild.textContent = newString; 
    }
  }
}

document.addEventListener("keydown", event => {
  const nodeName = event.target.nodeName.toLowerCase();
  if (nodeName == "body")
    return;

  if (nodeName == "input" || nodeName == "textarea"){
    event.target.addEventListener("keydown", emojiReplaceInput);
    return;
  }

  if (nodeName == "div"){
    let node = event.target;
    while(node.firstChild){
      node = node.firstChild; 
    }
    let divNode = node.parentNode.parentNode; 
    if (divNode.nodeName.toLowerCase() == "span")
      divNode = divNode.parentNode;
    let childSpans = divNode.childNodes;
    childSpans.forEach(item => {
      updateEmoji(item); 
    }); 
  }
});
