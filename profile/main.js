var ch=document.getElementById("contacts");
var b = document.getElementById("bright");
function changeb(){
    if(b.value == false){
        ch.style.backgroundColor="#252525";
        ch.style.color="white";
        b.style.float="right";
        b.style.backgroundColor="#0015ff";
        b.value = true;
    }
    else{
    ch.style.backgroundColor="white";
    ch.style.color="black";
    b.style.float="left";
    b.style.backgroundColor="#00ff08";
    b.value = false;
    }
}
