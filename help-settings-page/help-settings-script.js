let activeTab = 0;
let tabs = document.querySelectorAll('.tab');
let pages = document.querySelectorAll('.page');

tabs.forEach( (tab, tabNumber) => tab.addEventListener('click', () => {
  pages[tabNumber].style.display = "block";
  pages[activeTab].style.display = "none";
  activeTab = tabNumber;
}));
