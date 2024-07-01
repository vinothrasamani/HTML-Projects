const inputbox=document.getElementById("input-box");
const list = document.getElementById("list");

function my_fun()
{
    if(inputbox.value === ''){
        alert("You must enter something in the bar!");
    }
    else{
        let li =document.createElement("li");
        li.innerHTML = inputbox.value;
        list.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputbox.value = '';
    savedata();
}
list.addEventListener("click", function(e){
    if(e.target.tagName === "LI")
    {
        e.target.classList.toggle("checked");
        savedata();
    }
    else if(e.target.tagName === "SPAN")
    {
        e.target.parentElement.remove();
        savedata();
    }
}, false);
function savedata(){
    localStorage.setItem("data",list.innerHTML);
}
function showdata(){
    list.innerHTML = localStorage.getItem("data");
}
showdata();