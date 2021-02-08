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


function filter()
{
    let input = searchDoc.value.toLowerCase();
    let emos = document.querySelectorAll(".emoji-button");
    let emotes = document.querySelectorAll(".emote-button");

    if(emojiTable.style.display === "flex")
    {

        if(input === '')
        {
            emojiStyleReset();
        }

        else{
            pages.forEach(item => item.style.display = "block");

            for(let i = 0; i<emos.length; i++)
            {
                let emoname = emos[i].id.substring(1, emos[i].id.length-1);

                if(emoname.indexOf(input) > -1) //returns first index at which the search val is found
                {
                    //do nothing
                    // console.log(emoname);
                    emos[i].style.display = "inline-block";
                }
                else{
                    emos[i].style.display = "none";
                }

            }
        }
    }


    // if (emotes.style.display === "flex"){

    //     //emotes
    //     if(input === '')
    //     {
    //         emoteStyleReset();
    //     }

    //     else{

    //         for(let i = 0; i<emotes.length ; i++)
    //         {
    //             let emotename = emotes[i].id.substring(1, emotes[i].id.length-1);

    //             if(emotename.indexOf(input) > -1)
    //             {
    //                 // console.log(emotename);
    //                 emotes[i].style.display = "inline-block";
    //             }

    //             else{
    //                 emotes[i].style.display = "none";
    //             }
    //         }
    //     }
    // }
}

function emojiStyleReset()
{
    let emos = document.querySelectorAll(".emoji-button");

    for(let i=0; i<emos.length; i++)
    {
        emos[i].style.display = "inline-block";
    }
}

function emoteStyleReset()
{
    let emotes = document.querySelectorAll(".emote-button");

    for(let i=0; i<emotes.length; i++)
    {
        emotes[i].style.display = "inline-block";
    }
}


let searchDoc = document.querySelector(".search");
searchDoc.addEventListener("keyup", filter);

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
    searchDoc.style.display = "inline";  //search option
    previousBtn.style.display = "inline";   //prev and next button option
    nextBtn.style.display = "inline";
    searchDoc.value = '';
    emojiStyleReset();

});

emoteToggle.addEventListener("click",function(){
    emojiTable.style.display = "none";
    favoritesTable.style.display = "none";
    recentsTable.style.display = "none";
    emoteTable.style.display = "flex";
    previousBtn.style.display = "none";
    nextBtn.style.display = "none";
    searchDoc.style.display = "inline"; //search option
    searchDoc.value = '';
    emoteStyleReset();

});

favoritesButton.addEventListener("click",function(){
    emojiTable.style.display = "none";
    emoteTable.style.display = "none";
    recentsTable.style.display = "none";
    favoritesTable.style.display = "flex";
    searchDoc.style.display = "none";
    previousBtn.style.display = "none";
    nextBtn.style.display = "none";
});

recentsButton.addEventListener("click",function(){

    emojiTable.style.display = "none";
    emoteTable.style.display = "none";
    favoritesTable.style.display = "none";
    recentsTable.style.display = "flex";
    searchDoc.style.display = "none";
    previousBtn.style.display = "none";
    nextBtn.style.display = "none";
});


//TODO
//replace buttons with icons preferably color changable icons to say where user is at
//if searchdoc. value == 0 whether then display normal
// else if something is entered trigger filter
//check where the search is being done emoji table or emote table before filtering
