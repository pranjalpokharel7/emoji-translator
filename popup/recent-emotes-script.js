const recentPages = document.querySelectorAll(".recents-page");
const favoritePages = document.querySelectorAll(".fab-page");

maxSize = 50; // max number of emoji to be displayed in recent and favorites
browser.storage.local.get(["recentEmojiList",
    "favoritesEmojiList"])
    .then(appendEmojiToDOM)
    .catch(error =>  console.log(`Error: ${error}`));

// object constructor
class EmojiObject{
    constructor(id, value){
        this.id = id;
        this.value = value;
    }
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
        // if right-click on favourite emoji, remove it
        emojiObjectCollection = emojiObjectCollection.filter(emoji => {
            if (event.target.id == emoji.id) return false;    
            return true;
        });
        event.target.remove(); 
    }
    else {
        let latestEmoji = new EmojiObject(
            event.target.id, 
            event.target.textContent
        );
        emojiObjectCollection = addEmoji(latestEmoji, emojiObjectCollection,false);
    }

    browser.storage.local.set({
        "favoritesEmojiList" : emojiObjectCollection, 
    });
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

            recentPages[0].append(emojiButton);
        });
    }
    else {
        let emptyIndicatorText = document.createElement("div");
        emptyIndicatorText.innerHTML = "<h3>┻━┻︵ \\(°□°)/ ︵ ┻━┻</h3>" +
            "Smash some emoji buttons to get some content here!";
        emptyIndicatorText.classList.add("empty-text");

        recentPages[0].prepend(emptyIndicatorText);
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
    else {
        let emptyIndicatorText = document.createElement("div");
        emptyIndicatorText.innerHTML = "<h3>(*＾ω＾)人(＾ω＾*)</h3>" +
            "Right click on emoji buttons to add to favorites!"
        emptyIndicatorText.classList.add("empty-text");

        favoritePages[0].prepend(emptyIndicatorText);
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

