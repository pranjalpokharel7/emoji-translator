const recentPages = document.querySelectorAll(".recents-page");
const favoritePages = document.querySelectorAll(".fab-page");

maxSize = 50; // max number of emoji to be displayed in recent and favorites
browser.storage.local.get(["recentEmojiList",
    "favoritesEmojiList"])
    .then(appendEmojiToDOM)
    .catch(error =>  console.log(`Error: ${error}`));

// function as object constructor
function EmojiObject(id, value){
    this.id = id;
    this.value = value;
}

function addEmoji(latestEmoji, emojiObjectCollection, isRecentEmoji) {
    let existingEmojiIndex = -1;

    // for initial case when storage area is empty
    if (!emojiObjectCollection){
        return [latestEmoji];
    }

    emojiObjectCollection.forEach((emoji, index) => {
        if (emoji.value == latestEmoji.value){
            existingEmojiIndex = index;
        }
    })

    if (existingEmojiIndex >= 0){ 
        if (isRecentEmoji){
            emojiObjectCollection.splice(existingEmojiIndex, 1);
            emojiObjectCollection.unshift(latestEmoji);
        }
        return emojiObjectCollection;
    }

    if (emojiObjectCollection.length >= maxSize){
        emojiObjectCollection.pop(); 
        emojiObjectCollection.unshift(latestEmoji);
    }
    else {
        emojiObjectCollection.push(latestEmoji);
    }
    return emojiObjectCollection;
}

function addToEmojiQueue(event, emojiObjectCollection){
    let latestEmoji = new EmojiObject(
        event.target.id, 
        event.target.textContent
    );
    emojiObjectCollection = addEmoji(latestEmoji, emojiObjectCollection, true);
    browser.storage.local.set({
        "recentEmojiList" : emojiObjectCollection,
    });
}

function addToFavoritesList(event, emojiObjectCollection){
    event.preventDefault();

    if (event.target.classList.contains("favorite")){
        return false;
    }

    let latestEmoji = new EmojiObject(
        event.target.id, 
        event.target.textContent
    );
    emojiObjectCollection = addEmoji(latestEmoji, emojiObjectCollection,false);
    browser.storage.local.set({
        "favoritesEmojiList" : emojiObjectCollection, 
    })
    return false;
}

function appendEmojiToDOM(response){
    let recentEmojiCollection = response.recentEmojiList;
    let favoriteEmojiCollection = response.favoritesEmojiList;

    if (recentEmojiCollection) {
        recentEmojiCollection.forEach(emoji => {
            let emojiButton = document.createElement("button");
            emojiButton.id = emoji.id;
            emojiButton.textContent = emoji.value;
            emojiButton.classList.add("emoji-button");

            recentPages[0].prepend(emojiButton);
        });
    }

    if (favoriteEmojiCollection) {
        favoriteEmojiCollection.forEach(emoji => {
            let emojiButton = document.createElement("button");
            emojiButton.id = emoji.id;
            emojiButton.textContent = emoji.value;
            emojiButton.classList.add("emoji-button", "favorite");

            favoritePages[0].append(emojiButton);
        });
    }

    const emojiButtons = document.querySelectorAll(".emoji-button");
    emojiButtons.forEach(
        emojiButton => {
            emojiButton.addEventListener("click", 
                event => addToEmojiQueue(event, recentEmojiCollection));

            emojiButton.addEventListener("click", 
                () => navigator.clipboard.writeText(emojiButton.textContent));

            emojiButton.addEventListener("contextmenu", 
                event => addToFavoritesList(event, favoriteEmojiCollection));
        }
    );
}

