var targetPlace = document.getElementById('mainframein');
var viewPlace = document.getElementById('li');
var file = document.getElementById('files');
var arr =  new Array(150);

file.onchange = function(event){
	source(event);
}

function source(event){
	let url = URL.createObjectURL(event.target.files[0]);
	console.log(url);
	console.log(event.target.files[0]);
	let n,other,lnk;
	if (event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/svg+xml') {
		n = document.createElement('img');
		lnk = document.createElement('a');
		n.style.width = '122px';
		n.style.height = '100px';
		n.style.border = '2px solid black';
		n.style.margin = '5px';
		n.src = url;
		lnk.href = url;
		lnk.appendChild(n);
		lnk.target = "content";
		viewPlace.appendChild(lnk);
	}
	else{
		other = document.createElement('h5');
		lnk = document.createElement('a');
		other.style.border = '2px solid black';
		other.style.borderRadius = '5px';
		other.style.margin = '5px';
		other.style.background = 'gray';
		other.style.padding = '10px';
		other.style.overflow = 'hidden';
		lnk.href = url;
		other.innerHTML = event.target.files[0].name;
		lnk.appendChild(other);
		lnk.target = "content";
		lnk.style.textDecoration = 'none';
		viewPlace.appendChild(lnk);
	}
	console.log(event.target.files[0].type);
	
}
targetPlace.ondragover = function(e){
	e.preventDefault();
	targetPlace.style.width = '90%';
	targetPlace.style.height = '80%';
}

targetPlace.ondrop = function(e){
	e.preventDefault();
	e.target.files = e.dataTransfer.files;
	console.log(file);
	source(e);
	targetPlace.style.width = '60%';
	targetPlace.style.height = '60%';
}