let time = document.getElementById('times');
var clock = document.querySelector('#clock');
var menu = document.querySelector('i');
var choose = document.querySelector('#select');
var c1 = document.querySelector('#c1');
var body = document.querySelector('body');
var heading = document.getElementById('heading');
var digital = document.getElementById('digital');
var alarmsrc = document.getElementById('alarmsrc');
var stop = document.getElementById('stop');
var watch = document.querySelector('#watch');
var d = document.querySelector('#clock i');
var sw = document.getElementById('sw');
var alarm = document.getElementById('alarm');
var s=0,h=0,m=0,ms=0,c,timer;

//--------------------------alarm-------------------------


//--------------------------menu-------------------------

menu.onclick = function(){
	choose.style.display = 'flex';
}
digital.onclick = function(){
	clock.style.display = 'block';
	watch.style.display = 'none';
	alarmsrc.style.display = 'none';
	heading.innerHTML = 'Digital Clock';
}
stop.onclick = function(){
	clock.style.display = 'none';
	heading.innerHTML = 'Stop watch';
	alarmsrc.style.display = 'none';
	watch.style.display = 'block';
}
alarm.onclick = function(){
	clock.style.display = 'none';
	heading.innerHTML = 'Alarm';
	watch.style.display = 'none';
	alarmsrc.style.display = 'block';
}
choose.onmouseleave = function(){
	choose.style.display = 'none';
}

//--------------------------clack------------------------------
function change(){
	body.style.background = c1.value;
	load();
}
c1.onchange = function(){
	body.style.background = c1.value;
}
function load(){
	setInterval(()=>{
		var day = new Date();
		var hour = day.getHours();
		var min = day.getMinutes();
		var sec = day.getSeconds();
		if(hour > 12){hour-=12;}
		let hours = hour < 10 ? "0"+hour : hour;
		let mins = min < 10 ? "0"+min : min;		
		let secs = sec < 10 ? "0"+sec : sec;
		d.innerHTML = day.getDate() + "."+ day.getMonth()+"."+ day.getFullYear();
		time.innerHTML = hours+" : " + mins + " : "+secs;	
	},500);
}

//----------------stopwatch--------------------------------

var t=1;
function play(){
	c=true;
	if (t==1) {
		stopWatch();
		t=0;
	}
}

function pause1(){
	clearInterval(timer);
	c = false;
	t=1;
}
function restart(){
	s=0;h=0;m=0,ms=0;
	c = false;
}

function stopWatch(){
	clearInterval(timer);
	timer = setInterval(()=>{
		if (c == true) {
			if (ms == 100) {
				ms=0
				s++;
				if (s == 60) {
					s=0;
					m++;
					if (m == 60) {
						m=0;
						h++;
					}
				}
			}
			
			let h1 = h < 10 ? "0"+h : h;
			let m1 = m < 10 ? "0"+m : m;
			let s1 = s < 10 ? "0"+s : s;
			let ms1 = ms <10 ? "0"+ms : ms;
			sw.innerHTML = h1+" : "+m1+" : "+s1+" : "+ms1;
			ms++;
		}
		else{
			sw.innerHTML = " 00 : 00 : 00 : 00 ";
		}
	},10);
}
