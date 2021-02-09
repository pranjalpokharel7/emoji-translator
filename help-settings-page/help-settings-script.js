// ---------------- tab changing ---------------- 

let activeTab = 0;
const tabs = document.querySelectorAll('.tab');
const pages = document.querySelectorAll('.page');

tabs.forEach( (tab, tabNumber) => tab.addEventListener('click', () => {
  pages[activeTab].style.display = "none";
  pages[tabNumber].style.display = "block";

  tabs[activeTab].classList.remove("selected-tab");
  tabs[tabNumber].classList.add("selected-tab");

  activeTab = tabNumber;
}));

// ---------------- starting and ending character change ---------------- 

const characterChangeButton = document.querySelector('#character-change');
const leadCharacterInput = document.querySelector('#lead-ch')
const endCharacterInput = document.querySelector('#end-ch')

characterChangeButton.addEventListener('click', () => {
  if (leadCharacterInput.value.trim() && endCharacterInput.value.trim()){
    browser.storage.local.set({
      leadCharacter : leadCharacterInput.value, 
      endCharacter : endCharacterInput.value,
    }) 
  }
});

// ---------------- search preference change ---------------- 
const defaultSearchOptions = document.getElementsByName('default-search');
const searchChoiceSaveButton = document.querySelector('#search-preference-save');

searchChoiceSaveButton.addEventListener("click", () =>  {
  defaultSearchOptions.forEach(option => {
    if (option.checked){
      browser.storage.local.set({
        "searchChoice" : option.value,
      });
    }  
  }); 
});
