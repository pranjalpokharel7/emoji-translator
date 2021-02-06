const emojiRow = document.querySelectorAll(".emoji-row");
const saveButton = document.querySelector("#favorites-order-save");
const favoritesStatusText = document.querySelector("#favorites-status-text");

browser.storage.local.get("favoritesEmojiList")
  .then(loadEmojisToTable)
  .catch(error => console.log(`Error: ${error}`))

function loadEmojisToTable(response){
  let favoritesEmojiList = response.favoritesEmojiList; 

  if (!favoritesEmojiList){
    // do not display the button if the user has no favorites yet
    saveButton.style.display = "none";
    return;
  }
  
  favoritesStatusText.textContent = "Drag and drop to arrange the order" +
    " in which the favorite emojis will be displayed.";
  saveButton.style.display = "block";
  emojiRow.forEach(tableRow => {
    let emojiGroup = favoritesEmojiList.splice(0, 6);
    emojiGroup.forEach(emoji => {
      let tableData = document.createElement("td");
      tableData.textContent = emoji.value;

      // event listeners for draggable element
      tableData.draggable = true;
      tableData.addEventListener('dragstart', handleDragStart);
      tableData.addEventListener('dragend', handleDragEnd);

      // event listeners for drop target, both required
      tableData.addEventListener('drop', handleDrop);
      tableData.addEventListener('dragover', handleDragOver);

      // additional event listeners for drag-n-drop
      tableData.addEventListener('dragenter', handleDragEnter);
      tableData.addEventListener('dragleave', handleDragLeave);

      tableData.classList.add("favorites");
      tableData.id = emoji.id;

      tableRow.append(tableData);
    })
    saveButton.addEventListener('click',saveEmojiOrder);
  });
}

// all functions associated with drag and drop events
let emojiToBeDragged = null;
function handleDragStart(event){
  const selectedEmoji = event.target;
  selectedEmoji.style.opacity = '0.5';

  emojiToBeDragged = selectedEmoji;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/html', selectedEmoji.innerHTML);
}

function handleDragEnd(event){
  event.target.style.opacity = '1';
}

function handleDragOver(event){
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function handleDragEnter(event){
  if (event.target.classList){
    event.target.classList.add('swap');
  }
}

function handleDragLeave(event){
  if (event.target.classList){
    event.target.classList.remove('swap');
  }
}

function handleDrop(event){
  event.preventDefault();
  const emojiToBeSwapped = event.target;

  if (emojiToBeDragged != emojiToBeSwapped){
    emojiToBeDragged.innerHTML = emojiToBeSwapped.innerHTML;
    emojiToBeSwapped.innerHTML = event.dataTransfer.getData('text/html');
    emojiToBeSwapped.classList.remove('swap');
  }

  return false;
}

// event handler for save button
function EmojiObject(id, value){
  this.id = id;
  this.value = value;
}

function saveEmojiOrder(event){
  event.preventDefault();
  const emojiOrder = document.querySelectorAll(".favorites");
  let favoritesEmojiList = [];
  emojiOrder.forEach(emoji => {
    favoritesEmojiList.push(new EmojiObject(emoji.id, emoji.textContent));
  });    

  browser.storage.local.set({
   "favoritesEmojiList" : favoritesEmojiList,
  });
}
