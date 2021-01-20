let instruction = document.querySelector(".instruction");
let toggleChoice = null;
let choiceSelected = null;

let toggleHistory = browser.storage.local.get("toggle");
toggleHistory.then(
    item => {
        const toggleOn = document.querySelector("#toggle-on");
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


let docu = document.querySelectorAll("button");

for(let i=0; i<docu.length; i++) {
    show = function(){
        navigator.clipboard.writeText(docu[i].textContent);
    }
    docu[i].addEventListener('click',show);
}

let counter = 0;
const next = document.querySelector("#next");
const previous = document.querySelector("#previous");
const pages = document.querySelectorAll(".page");
const lastPage = pages.length;

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

    // if (emojiTable.style.display === "flex")
    // {
       if(input){
        pages.forEach(item => item.style.display = "block");

            for(let i = 0; i<emos.length; i++)
            {
                let emoname = emos[i].id.substring(1, emos[i].id.length-1);

                if(emoname.indexOf(input) > -1)
                {
                    //do nothing
                    console.log(emoname);
                    emos[i].style.display = "inline-block";
                }
                else{
                    emos[i].style.display = "none";
                }

            }
        }
    }
    
    // else if(emoteTable.style.display === "flex")
    // {
        // if(input){
        //     for(let i = 0; i<emotes.length; i++)
        //     {
        //         let emotename = emotes[i].id.substring(1, emotes[i].id.length-1);

        //         if(emotename.indexOf(input) > -1)
        //         {
        //             //do nothing
        //             console.log(emotename);
        //             emotes[i].style.display = "inline-block";
        //         }
        //         else{
        //             emotes[i].style.display = "none";
        //         }

        //     }
            
        // }
        //search in the emote area
    // }
    //bug if entered and cleared doesn't show initial set of emojis 
    //back to normal aka is shuffled once search is used
// }

let searchDoc = document.querySelector(".search");
searchDoc.addEventListener("keyup", filter);

//buttons
let previousBtn = document.querySelector("#previous");
let nextBtn = document.querySelector("#next");
let emojiToggle = document.querySelector("#emoji-toggle");
let emoteToggle = document.querySelector("#emote-toggle");
let favoritesButton = document.querySelector("#favorites");

//tables
let emojiTable = document.querySelector("#emoji-table");
let emoteTable = document.querySelector("#emoticon-table");
let favoritesTable = document.querySelector("#fab-table");

emojiToggle.addEventListener("click",function(){
    emoteTable.style.display = "none";
    favoritesTable.style.display = "none";
    emojiTable.style.display = "flex";
    searchDoc.style.display = "inline";
    previousBtn.style.display = "inline";
    nextBtn.style.display = "inline";
    
});

emoteToggle.addEventListener("click",function(){
    emojiTable.style.display = "none";
    favoritesTable.style.display = "none";
    emoteTable.style.display = "flex";
    previousBtn.style.display = "none";
    nextBtn.style.display = "none";
    searchDoc.style.display = "inline";
});

favoritesButton.addEventListener("click",function(){
    emojiTable.style.display = "none";
    emoteTable.style.display = "none";
    favoritesTable.style.display = "flex";
    searchDoc.style.display = "none";
    previousBtn.style.display = "none";
    nextBtn.style.display = "none";
});

