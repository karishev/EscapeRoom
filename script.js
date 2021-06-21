let nameoftheuser;
let names = ["Elina", "Maram", "Nouf", "Oyungerel", "Prince","Pierre","Shyngys", "Adina", "Fatema", "Long", "Juan", "Hanaan", "Safal"]
let names2 = ["elina", "maram", "nouf", "oyungerel", "prince","pierre","shyngys", "adina", "fatema", "long", "juan", "hanaan", "safal"]

let startingaudio;
let nameoftheusergiven = document.getElementById('nameoftheuser');

// let themesong = document.getElementById('themesong');

let startingpoint = document.getElementById('start');

document.addEventListener('DOMContentLoaded', () => {

	// document.addEventListener('mousemove',() => {
	// 	themesong.play();
	// })

	let title = document.querySelector('.title');
	title.style.cursor = "default";
	let useranswer = document.querySelector('.user');
	title.addEventListener("keyup", (event) => {
		if (event.key === "Enter") {
			nameoftheuser = useranswer.value;

			if (names.indexOf(nameoftheuser) == -1 && names2.indexOf(nameoftheuser) == -1) {
				nameoftheusergiven.src = "audio/part1/Alex.mp3";
				startingpoint.src = "audio/part1/Alex.mp3";
			}
			else {
				nameoftheusergiven.src = "audio/part1/" + names[names.indexOf(nameoftheuser)] + ".mp3";
				startingpoint.src = "audio/part1/" + names[names.indexOf(nameoftheuser)] + ".mp3";
				console.log("audio/part1/" + names[names.indexOf(nameoftheuser)] + ".mp3");
				// startingaudio = names[names.indexOf(nameoftheuser)];
			}
			title.style.cursor = "none";
			title.classList.add('fadeout');
			let headphones = document.querySelector('.headphones');
			headphones.style.opacity = "0";
			
			useranswer.disabled = true;
			enableScroll();
			setTimeout(() => {
				title.remove();
				// themesong.volume = 0;
				
			}, 4000);
			
			setTimeout(() => {
				headphones.remove();
				document.querySelector('.start').classList.add('fadein');
			}, 4000);

			setTimeout(() => {
				startingpoint.play();
			}, 4000)
		}
	})
})

let numofclicks = 0;

let clicks = 0;
let question = 1;
let now = 0;
let question1yes = document.getElementById('question1yes');
let question1no = document.getElementById('question1no');
let q1_pause = document.getElementById('question1pause')

let question2yes = document.getElementById('question2yes');
let question2no = document.getElementById('question2no');
let q2_pause = document.getElementById('question2pause')

let question3yes = document.getElementById('question3yes');
let question3no = document.getElementById('question3no');
let q3_pause = document.getElementById('question3pause')



let win = document.getElementById('escaped');
let lose = document.getElementById('dead');
startingpoint.addEventListener('timeupdate', () => {
	
	if (startingpoint.ended) {
		console.log('question1');
		q1_pause.play();
		if (numofclicks%2 == 1) blink();
		now = numofclicks;
	}
})



let yesno = 0;
let choice1;
let choice2;
let choice3;
q1_pause.addEventListener('timeupdate', ()=> {
	if (q1_pause.ended) {
		yesno = numofclicks - now;
		if (yesno>=0 && yesno<=2) {
			question1yes.play();
			choice1 = "yes";
		}
		else {
			question1no.play();
			choice1 = "no";
		}
	}
})
q2_pause.addEventListener('timeupdate', ()=> {
	if (q2_pause.ended) {
		yesno = numofclicks - now;
		if (yesno>=0 && yesno<=2) {
			question2yes.play();
			choice2 = "yes";
		}
		else {
			question2no.play();
			choice2 = "no";
		}
	}
})
q3_pause.addEventListener('timeupdate', ()=> {
	if (q3_pause.ended) {
		yesno = numofclicks - now;
		if (yesno>=0 && yesno<=2) {
			question3yes.play();
			choice3 = "yes";
		}
		else {
			question3no.play();
			choice3 = "no";
		}
	}
})

question1yes.addEventListener('timeupdate', () => {
	if (question1yes.ended) {
		console.log('question2');
		q2_pause.play();
		if (numofclicks%2 == 1) blink();
		now = numofclicks;
	}
})

question1no.addEventListener('timeupdate', () => {
	if (question1no.ended) {
		console.log('question2');
		q2_pause.play();
		if (numofclicks%2 == 1) blink();
		now = numofclicks;
	}
})

question2yes.addEventListener('timeupdate', () => {
	if (question2yes.ended) {
		console.log('question3');
		q3_pause.play();
		if (numofclicks%2 == 1) blink();
		now = numofclicks;
	}
})


question2no.addEventListener('timeupdate', () => {
	if (question2no.ended) {
		console.log('question3');
		q3_pause.play();
		if (numofclicks%2 == 1) blink();
		now = numofclicks;
	}
})

question3yes.addEventListener('timeupdate', () =>  {
	if (question3yes.ended) {
		if (choice1 == "yes" && choice2 == "yes") {
			win.play();
		}
		else {
			lose.play();
		}
	}
})

question3no.addEventListener('timeupdate', () => {
	if (question3no.ended) {
		lose.play();
	}
})

function enableScroll() {
	window.onscroll = function() {};
}


let gamescreen = document.querySelector(".start");

// $("body").mousemove(function(e) {
// 	console.log(e.pageX);
// 	console.log(e.pageY);
// })

function update(e){

	var x = e.clientX || e.touches[0].clientX;
	var y = e.clientY || e.touches[0].clientY;

	var style = document.querySelector('.start').style;

	if (numofclicks > 0) {
		style.setProperty('--cursorX', x + 'px');
		style.setProperty('--cursorY', y + 'px');
	}

}
let flash = document.getElementById('flash');
let check = 0;

function blink() {
	let style = document.querySelector('.shelf').style;
	numofclicks = numofclicks + 1;
	if (check == 0) {
		style.opacity = "1";
		check = 1;
		flash.load();
		flash.play();
	}
	else { 
		style.opacity = "5%";
		check = 0;
		flash.load();
		flash.play();
	}
}

document.querySelector('.start').addEventListener('mousemove',update)
document.querySelector('.start').addEventListener('touchmove',update)
