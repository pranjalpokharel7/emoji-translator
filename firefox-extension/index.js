let emojiName = "";
const emojiCollection = {
  "heart" : "❤️",
  "fire" : "🔥",
}

const stack = {
  bottom: "$",
  emoteKey: [],
  index: 0,
  cursorEnd: -1,
};

const emojiListener = event => {
  const character = event.key;

  if (character == ":"){
    if (stack.bottom == "$"){
      // stack.cursorEnd = event.target.selectionStart;
      startIndex = event.target.value.length;
      stack.bottom = ":";
    }
    else if (stack.bottom == ":"){ 
      stack.bottom = "$";

      emojiName = "";
      stack.emoteKey.forEach(item => {emojiName += item;});

      if (emojiCollection[emojiName]){
        event.preventDefault();
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
    if (event.keyCode == 8){ // for backspace
      stack.emoteKey.splice(stack.index-1, 1);
      stack.index = stack.index > 0 ? stack.index - 1 : 0;
    }
    else if ((event.keyCode >= 65 && event.keyCode <= 90) || character == "_" || character == " ") {
      stack.emoteKey.push(character);
      stack.index += 1;
    }
    else {
      return;
    }
  }
}

const testEvent = event => {
  console.log(event.target.textContent);
}

const arrayTextInput = document.querySelectorAll("input[type=text]");
const arrayTextArea = document.querySelectorAll("textarea");

arrayTextInput.forEach((item)=>{
  item.addEventListener("keydown", emojiListener);
});

arrayTextArea.forEach((item)=>{
  item.addEventListener("keydown", emojiListener);
  //console.log(item); 
});

console.log(arrayTextArea);
