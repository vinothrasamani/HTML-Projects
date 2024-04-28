var name1 = document.getElementById('name');
var audience = document.getElementById('btn1');
var admin = document.getElementById('btn2');

//------------------------------------common-----------------------------------
function notify(Body){
	new Notification("Thoughts",{
		body : Body,
		icon : "../project5/assets/logo.png",
		tag : "noRepeat",
	});
}

//-----------------------------------index.html---------------------------------
audience.onclick = function(){
	if (name1.value != "") {
		notify("welcome To Thoughts " + name1.value);
		window.open("../project5/home.html");
	}
	else{
		notify("Please provide your name..")
	}
}
admin.onclick = function(){
	Notification.requestPermission().then(check =>{
		if(check == "granted"){
			if(name1.value != ""){
				if (name1.value == "vinoth") {
					notify("Successfully in..");
					window.open("../project5/admin.html");
				}
				else{
					notify("You are not an admin..");
				}
			}
			else{
				notify("Please Enter your name..");
			}
		}
		else{
			alert("Notification denied!!");
		}
	});
}

