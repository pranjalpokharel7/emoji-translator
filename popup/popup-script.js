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
// might need refactoring and optimization, inside pageScroll, the 2 if-blocks

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

// add clipboard functionality to emote buttons, for emojis check 
// ./recent-emotes-script.js
allEmotes.forEach(emoteButton => emoteButton.addEventListener("click", 
    () => navigator.clipboard.writeText(emoteButton.textContent)));

function filterEmojis(searchChoice){
    let input = searchDoc.value.toLowerCase();
    emojiStyleReset();

    if (input == ""){
        searchPage.style.display = "none";
        allTabPages[0].style.display = "flex"; // defined below
        return;
    }

    tabPages.forEach(tabPage => tabPage.style.display = "none");
    searchPage.style.display = "block";
    let searchResults = new Set();
    let searchCollection = allEmojis;

    if (searchChoice == "default-emote-search"){
        searchCollection = allEmotes;
    }

    searchCollection.forEach(emoji => {
        if (emoji.id.indexOf(input) > -1)
            searchResults.add(emoji);
    });
    searchResults.forEach(buttonNode => searchPage.append(buttonNode));
}

function emojiStyleReset(){
    searchPage.innerHTML = "";
}

function addSearchEvent(response){
    searchDoc.addEventListener("keyup", 
        () => filterEmojis(response.searchChoice));
}

let searchDoc = document.querySelector("#search");
browser.storage.local.get("searchChoice")
    .then(addSearchEvent)
    .catch(error => console.log(`Error: ${error}`));

//---------------- tab change ----------------

const tabChangeButtons = document.querySelectorAll(".tab");
const allTabPages = document.querySelectorAll(".tab-page");
let isEmojiTabOpen = false;
let isEmoteTabOpen = false;

tabChangeButtons.forEach((tabButton, buttonIndex) => 
    tabButton.addEventListener("click",event => toggleTabs(event, buttonIndex))
);

function toggleTabs(event, index){
    allTabPages.forEach(tabPage => tabPage.style.display = "none");
    allTabPages[index].style.display = "flex";

    tabChangeButtons.forEach(tab => tab.classList.remove("selected-tab"));
    event.target.classList.add("selected-tab");

    isEmojiTabOpen = index == 2 ? true : false;
    isEmoteTabOpen = index == 3 ? true : false;
}
