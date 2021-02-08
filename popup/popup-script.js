//---------------- refresh button code ----------------

const refreshButton = document.querySelector("#refresh-button");
refreshButton.addEventListener("click", () => browser.runtime.reload());

//---------------- toggle button code ----------------

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

let settingPage = {
    url: '../help-settings-page/help-settings-content.html',
}
let settingButton = document.querySelector('#settings-button');
settingButton.addEventListener("click", () => {
    let tabCreation = browser.windows.create(settingPage);
    tabCreation.then(
        () => console.log("Settings Page Opened"),
        () => console.log(`Errror in opning settings page: ${error}`)
    )
})

const next = document.querySelector("#next");
const previous = document.querySelector("#previous");
const pages = document.querySelectorAll(".page");
const lastPage = pages.length;
let counter = 0;

const pageScroll = (event) => {
    const prevCounter = counter;
    const currentPage = event.target;

    if (currentPage.id === "previous")
        counter = counter === 0 ? lastPage-1 : counter - 1;
    else
        counter = (counter + 1) % lastPage;

    pages[counter].style.display = "block";
    pages[prevCounter].style.display = "none";
}

next.addEventListener("click", pageScroll); 
previous.addEventListener("click", pageScroll); 

const searchPage = document.querySelector('#search-results-page');
const tabPages = document.querySelectorAll('.tab-page');
const allEmojis = Array.from(document.querySelectorAll(".emoji-button"));

function filterEmojis()
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

    allEmojis.forEach(emoji => {
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

let searchDoc = document.querySelector("#search");
searchDoc.addEventListener("keyup", filterEmojis);

// the toggle buttons code are redundant, refactoring needed

//buttons
let previousBtn = document.querySelector("#previous");
let nextBtn = document.querySelector("#next");
let emojiToggle = document.querySelector("#emoji-toggle");
let emoteToggle = document.querySelector("#emote-toggle");
let favoritesButton = document.querySelector("#favorites");
let recentsButton = document.querySelector("#recents");

//tables
let emojiTable = document.querySelector("#emoji-table");
let emoteTable = document.querySelector("#emoticon-table");
let favoritesTable = document.querySelector("#fab-table");
let recentsTable = document.querySelector("#recents-table");

emojiToggle.addEventListener("click",function(){
    emoteTable.style.display = "none";
    favoritesTable.style.display = "none";
    recentsTable.style.display = "none";
    emojiTable.style.display = "flex";
});

emoteToggle.addEventListener("click",function(){
    emojiTable.style.display = "none";
    favoritesTable.style.display = "none";
    recentsTable.style.display = "none";
    emoteTable.style.display = "flex";
});

favoritesButton.addEventListener("click",function(){
    emojiTable.style.display = "none";
    emoteTable.style.display = "none";
    recentsTable.style.display = "none";
    favoritesTable.style.display = "flex";
});

recentsButton.addEventListener("click",function(){
    emojiTable.style.display = "none";
    emoteTable.style.display = "none";
    favoritesTable.style.display = "none";
    recentsTable.style.display = "flex";
});


//TODO
//replace buttons with icons preferably color changable icons to say where user is at
//if searchdoc. value == 0 whether then display normal
// else if something is entered trigger filter
//check where the search is being done emoji table or emote table before filtering
