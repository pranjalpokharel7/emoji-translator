let emojiName = "";
const emojiCollection = {
  "heart" : "❤️",
  "fire" : "🔥",
}

const stack = {
  bottom: "$",
  top: "$",
  emoteKey: [],
  index: 0,
};

const emojiListener = event => {
  const character = event.key;
  if (character == ":"){
    if (stack.bottom == "$"){
      startIndex = event.target.value.length;
      stack.bottom = ":";
    }
    else if (stack.bottom == ":"){
      event.preventDefault();
      stack.bottom = "$";
      emojiName = "";
      stack.emoteKey.forEach(item => {emojiName += item;});
      if (emojiCollection[emojiName]){
        const prevString = event.target.value;
        const startIndex = prevString.indexOf(`:${emojiName}`);
        const newString = prevString.substring(0, startIndex) + emojiCollection[emojiName] + prevString.substring(startIndex + stack.index + 1, prevString.length);
        event.target.value = newString; 
      }
      stack.emoteKey.length = 0;
      stack.index = 0;
    }  
    return;
  }

  if (stack.bottom == ":"){
    if ((event.keyCode >= 65 && event.keyCode <= 90) || character == "_"){
      stack.emoteKey.push(character);
      stack.index += 1;
    }
    else if (event.keyCode == 8){ // for backspace
      stack.emoteKey.splice(stack.index-1, 1);
      stack.index = stack.index > 0 ? stack.index - 1 : 0;
    }
  }

}

const arrayTextInput = document.querySelectorAll("input[type=text]");
arrayTextInput.forEach((item)=>{
  item.addEventListener("keydown", emojiListener);
});
