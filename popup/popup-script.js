//---------------- refresh button code ----------------

const refreshButton = document.querySelector("#refresh-button");
refreshButton.addEventListener("click", () => browser.runtime.reload());

//---------------- toggle button (turn on/off) code ----------------

let toggleChoice = null;
let choiceSelected = null;

let toggleHistory = browser.storage.local.get("toggle");
toggleHistory.then(
    item => {
        const toggleOn = document.querySelector("#toggle-button");
        toggleChoice = item.toggle;
        toggleOn.textContent = toggleChoice ? "TURN OFF" : "TURN ON";
        toggleOn.addEventListener("click", function() {
            toggleChoice = !toggleChoice;
            toggleOn.textContent = toggleChoice ? "TURN OFF" : "TURN ON";
            choiceSelected = browser.storage.local.set({
                toggle : toggleChoice,
            });
            if (choiceSelected){
                browser.runtime.sendMessage({
                    toggle : toggleChoice, 
                });
            }
        });
    }, 
    error => console.log(`Error: ${error}`)
);

//---------------- settings page ----------------

const settingPage = {
    url: '../help-settings-page/help-settings-content.html',
}
const settingButton = document.querySelector('#settings-button');
settingButton.addEventListener("click", () => {
    browser.windows.create(settingPage);
})

//---------------- page navigation ----------------
// also needs refactoring and optimization 

const nextButton = document.querySelector("#next");
const previousButton = document.querySelector("#previous");

let emojiCounter = 0;
const emojiPages = document.querySelectorAll(".emoji-page");
const lastEmojiPage = emojiPages.length;

let emoteCounter = 0;
const emotePages = document.querySelectorAll(".emote-page");
const lastEmotePage = emotePages.length;

const pageScroll = (event) => {
    const navigationButton = event.target;

    if (isEmojiTabOpen){
        const prevCounter = emojiCounter;
        if (navigationButton.id === "previous")
            emojiCounter = emojiCounter === 0 ? lastEmojiPage-1:emojiCounter-1;
        else
            emojiCounter = (emojiCounter + 1) % lastEmojiPage;
        emojiPages[emojiCounter].style.display = "block";
        emojiPages[prevCounter].style.display = "none";
    }

    if (isEmoteTabOpen) {
        const prevCounter = emoteCounter;
        if (navigationButton.id === "previous")
            emoteCounter = emoteCounter === 0 ? lastEmotePage-1:emoteCounter-1;
        else
            emoteCounter = (emoteCounter + 1) % lastEmotePage;
        emotePages[emoteCounter].style.display = "block";
        emotePages[prevCounter].style.display = "none";
    }
}

nextButton.addEventListener("click", pageScroll); 
previousButton.addEventListener("click", pageScroll); 

//---------------- search result ----------------

const searchPage = document.querySelector('#search-results-page');
const tabPages = document.querySelectorAll('.tab-page');
const allEmojis = Array.from(document.querySelectorAll(".emoji-button"));
const allEmotes = Array.from(document.querySelectorAll(".emote-button"));

function filterEmojis(event, searchChoice)
{
    let input = searchDoc.value.toLowerCase();
    if (input == ""){
        emojiStyleReset();
        searchPage.style.display = "none";
        recentsTable.style.display = "flex";
        return;
    }

    tabPages.forEach(tabPage => tabPage.style.display = "none");
    searchPage.style.display = "flex";
    let searchResults = new Set();
    let searchCollection = allEmojis;

    if (searchChoice == "default-emote-search"){
        searchCollection = allEmotes;
    }

    searchCollection.forEach(emoji => {
        let emojiName = emoji.id.substring(1, emoji.id.length);
        if (emojiName.indexOf(input) > -1)
            searchResults.add(emoji);
    });
    emojiStyleReset();
    searchResults.forEach(buttonNode => searchPage.append(buttonNode));
}

function emojiStyleReset()
{
    searchPage.innerHTML = "";
}

function addSearchEvent(response){
    searchDoc.addEventListener("keyup", 
        event => filterEmojis(event, response.searchChoice));
}

let searchDoc = document.querySelector("#search");
browser.storage.local.get("searchChoice")
    .then(addSearchEvent)
    .catch(error => console.log(`Error: ${error}`));

// the code below needs refactoring and redundancy check

//buttons
let emojiToggle = document.querySelector("#emoji-toggle");
let emoteToggle = document.querySelector("#emote-toggle");
let favoritesButton = document.querySelector("#favorites");
let recentsButton = document.querySelector("#recents");

//tables
let emojiTable = document.querySelector("#emoji-table");
let emoteTable = document.querySelector("#emoticon-table");
let favoritesTable = document.querySelector("#fab-table");
let recentsTable = document.querySelector("#recents-table");

let isEmojiTabOpen = false;
let isEmoteTabOpen = false;

//---------------- tab change ----------------

emojiToggle.addEventListener("click",function(){
    emoteTable.style.display = "none";
    favoritesTable.style.display = "none";
    recentsTable.style.display = "none";
    emojiTable.style.display = "flex";

    isEmojiTabOpen = true;
    isEmoteTabOpen = false;
});

emoteToggle.addEventListener("click",function(){
    emojiTable.style.display = "none";
    favoritesTable.style.display = "none";
    recentsTable.style.display = "none";
    emoteTable.style.display = "flex";

    isEmojiTabOpen = false;
    isEmoteTabOpen = true;
});

favoritesButton.addEventListener("click",function(){
    emojiTable.style.display = "none";
    emoteTable.style.display = "none";
    recentsTable.style.display = "none";
    favoritesTable.style.display = "flex";

    isEmojiTabOpen = false;
    isEmoteTabOpen = false;
});

recentsButton.addEventListener("click",function(){
    emojiTable.style.display = "none";
    emoteTable.style.display = "none";
    favoritesTable.style.display = "none";
    recentsTable.style.display = "flex";

    isEmojiTabOpen = false;
    isEmoteTabOpen = false;
});


//TODO
//replace buttons with icons preferably color changable icons to say where user is at
//if searchdoc. value == 0 whether then display normal
// else if something is entered trigger filter
//check where the search is being done emoji table or emote table before filtering
