// ---------------- tab changing ---------------- 

let activeTab = 0;
let tabs = document.querySelectorAll('.tab');
let pages = document.querySelectorAll('.page');

tabs.forEach( (tab, tabNumber) => tab.addEventListener('click', () => {
  pages[activeTab].style.display = "none";
  pages[tabNumber].style.display = "block";

  tabs[activeTab].classList.remove("selected-tab");
  tabs[tabNumber].classList.add("selected-tab");

  activeTab = tabNumber;
}));

// ---------------- starting and ending character change ---------------- 

let characterChangeButton = document.querySelector('#character-change');
let leadCharacterInput = document.querySelector('#lead-ch')
let endCharacterInput = document.querySelector('#end-ch')

characterChangeButton.addEventListener('click', () => {
  if (leadCharacterInput.value.trim() && endCharacterInput.value.trim()){
    browser.storage.local.set({
      leadCharacter : leadCharacterInput.value, 
      endCharacter : endCharacterInput.value,
    }) 
    console.log("Characters changed!");
  }
});

