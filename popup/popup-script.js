const toggleOn = document.querySelector("#toggle-on");
const toggleOff = document.querySelector("#toggle-off");
let instruction = document.querySelector(".instruction");

toggleOn.addEventListener("click", function() {
    instruction.style.background = "#90EE90";
    browser.runtime.sendMessage({
        toggle : true, 
    });
});

toggleOff.addEventListener("click", function() {
    instruction.style.background = "#ff7f7f";
    browser.runtime.sendMessage({
        toggle : false, 
    })
});

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

    if(input){
        pages.forEach(item => item.style.display = "block")

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

    //back to normal
    // pages.forEach(item => item.style.display = "none");
    // pages[0].style.display = "block";
        



}

let searchDoc = document.querySelector(".search");

searchDoc.addEventListener("keyup", filter);