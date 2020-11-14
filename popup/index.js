
var docu = document.querySelectorAll("button");

// docu[0].onclick = show;
for(let i=0; i<docu.length; i++)
{
    show = function(){
        // let copyThis = "F";
        // copyThis = emo;
        // alert(emo);
        navigator.clipboard.writeText(docu[i].textContent);
    }
    docu[i].addEventListener('click',show);
}