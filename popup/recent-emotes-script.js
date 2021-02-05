const recentPages = document.querySelectorAll(".recents-page");

maxSize = 50;
recentEmoji = browser.storage.local.get("recentEmojiList")
    .then(appendEmojiToDOM)
    .catch(error =>  console.log(`Error: ${error}`));

function EmojiObject(id, value){
    this.id = id;
    this.value = value;
}

function addToEmojiQueue(event, emojiObjectCollection){
    let latestEmoji = new EmojiObject(
        event.target.id, 
        event.target.textContent
    );
    let existingEmojiIndex = -1;
    emojiObjectCollection.forEach((emoji, index) => {
        if (emoji.value == latestEmoji.value){
            existingEmojiIndex = index;
        }
    })

    if (existingEmojiIndex >= 0){ 
        emojiObjectCollection.splice(existingEmojiIndex, 1);
        emojiObjectCollection.unshift(latestEmoji);
    }
    else {
        // i hate this nested structure, will find suitable replacement in 
        // next commit
        if (emojiObjectCollection.length >= maxSize){
            emojiObjectCollection.pop(); 
            emojiObjectCollection.unshift(latestEmoji);
        }

        else {
            emojiObjectCollection.push(latestEmoji);
        }
    }

    browser.storage.local.set({
        "recentEmojiList" : emojiObjectCollection,
    });
}

function appendEmojiToDOM(response){
    let emojiObjectCollection = response.recentEmojiList;
    console.log(emojiObjectCollection);
    emojiObjectCollection.forEach(emoji => {
        let emojiButton = document.createElement("button");
        emojiButton.id = emoji.id;
        emojiButton.textContent = emoji.value;
        emojiButton.className = "emoji-button";

        recentPages[0].append(emojiButton);
    });

    const emojiButtons = document.querySelectorAll(".emoji-button");
    emojiButtons.forEach(
        emojiButton => {
            emojiButton.addEventListener(
            "click", event => addToEmojiQueue(event, emojiObjectCollection))

            emojiButton.addEventListener("click", 
                () => navigator.clipboard.writeText(emojiButton.textContent));
        }
    );
}

