var img = document.getElementById('img');
var i1 = document.getElementById('i1');
var i2 = document.getElementById('i2');
var i3 = document.getElementById('i3');
var i4 = document.getElementById('i4');
var i=0;
i1.onclick = function(){
	img.src = 'photos/img2.jpg';
}
i2.onclick = function(){
	img.src = 'photos/img3.jpg';
}
i3.onclick = function(){
	img.src = 'photos/img4.jpg';
}
i4.onclick = function(){
	img.src = 'photos/img1.jpg';
}

setInterval(()=>{
	i++;
	img.src = "photos/img"+i+".jpg";
	if (i==4) {i=0;}
},2500);
