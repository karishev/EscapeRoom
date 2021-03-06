
// Decalring the possible names

let nameoftheuser;
let names = ["Elina", "Maram", "Nouf", "Oyungerel", "Prince","Pierre","Shyngys", "Adina", "Fatema", "Long", "Juan", "Hanaan", "Safal"]
let names2 = ["elina", "maram", "nouf", "oyungerel", "prince","pierre","shyngys", "adina", "fatema", "long", "juan", "hanaan", "safal"]

let startingaudio;
let nameoftheusergiven = document.getElementById('nameoftheuser');


let startingpoint = document.getElementById('start');

//as soon as the website loads we do stuff

document.addEventListener('DOMContentLoaded', () => {

	let title = document.querySelector('.title');
	title.style.cursor = "default";								//at the beginning it was none, so we change it to default
	let useranswer = document.querySelector('.user');			
	title.addEventListener("keyup", (event) => {				//event if user write his name and presses enter
		if (event.key === "Enter") {
			nameoftheuser = useranswer.value;

			if (names.indexOf(nameoftheuser) == -1 && names2.indexOf(nameoftheuser) == -1) {		//checking if the given name is not in the list
				nameoftheusergiven.src = "audio/part1/Alex.mp3";
				startingpoint.src = "audio/part1/Alex.mp3";
			}

																									//if it is in one of the lists, we play audio corresponding
			else if (names.indexOf(nameoftheuser) != -1) {
				nameoftheusergiven.src = "audio/part1/" + names[names.indexOf(nameoftheuser)] + ".mp3";
				startingpoint.src = "audio/part1/" + names[names.indexOf(nameoftheuser)] + ".mp3";
				console.log("audio/part1/" + names[names.indexOf(nameoftheuser)] + ".mp3");
			}

			else if(names2.indexOf(nameoftheuser) != -1) {
				let index = names2.indexOf(nameoftheuser);
				nameoftheusergiven.src = "audio/part1/" + names[index] + ".mp3";
				startingpoint.src = "audio/part1/" + names[index] + ".mp3";
			}

			title.style.cursor = "none";
			title.classList.add('fadeout');															//fadeout to make a smoother effect of dissapearing
			let headphones = document.querySelector('.headphones');
			headphones.style.opacity = "0";
			
			useranswer.disabled = true;																//user can't write no more in input box
			enableScroll();
			setTimeout(() => {
				title.remove();
			}, 4000);																				//in 4 seconds title will be removed
			
			setTimeout(() => {
				headphones.remove();
				document.querySelector('.start').classList.add('fadein');
			}, 4000);

			setTimeout(() => {																		//playing audio after everything is delted and we are on the ain screen
				startingpoint.play();
			}, 4000)
		}
	})
})

//declaring variables and getting the audios for the questions

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

let winscreen = document.getElementById('win');
let losescreen = document.getElementById('lose');

//when the starting audio stops, we play the music for the moment when the person has to answer

startingpoint.addEventListener('timeupdate', () => {
	
	if (startingpoint.ended) {
		console.log('question1');
		q1_pause.play();
		
		if (numofclicks%2 == 1) blink();
		now = numofclicks;						//so we know when the pause started and how many clicks have been made after
	}
})



let yesno = 0;
let choice1;
let choice2;
let choice3;

//when the first pause stops, we save the answer and based on it we play corresponding audio
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
//same as the first pause
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

//all reactions to the questionsanswers that will play and if ended do something

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

//after all of the audios have been played, based on the answers, we make a win audio and winscreen or lose ausio and losescreen
let doit1 = 0;
let doit2 = 0;
win.addEventListener('timeupdate', () => {
	if (win.currentTime > 30 && doit1 == 0) {				//so the user can't use the flashligh
		document.querySelector('.start').remove();
		flash.remove();
		document.body.style.cursor = "none";
		doit1 = 1;
		
	}
	if (win.ended) {
		winscreen.style.opacity = "100%";
		document.getElementById('win').classList.add('fadein');
		winscreen.style.cursor = "default";
	}
})

lose.addEventListener('timeupdate', () => {
	if(lose.currentTime > 25 && doit2 == 0) {			//so the user can't use the flashligh
		flash.remove();
		document.querySelector('.start').remove();
		document.body.style.cursor = "none";
		doit2 = 1;
	}
	if (lose.ended) {
		losescreen.style.opacity = "100%";
		document.getElementById('lose').classList.add('fadein');
		losescreen.style.cursor = "default";
	}
})

function enableScroll() {
	window.onscroll = function() {};
}


let gamescreen = document.querySelector(".start");


function update(e){								//to get the coordinates of the mouse positiona nd update the flashlight

	var x = e.clientX || e.touches[0].clientX;
	var y = e.clientY || e.touches[0].clientY;

	var style = document.querySelector('.start').style;

	if (numofclicks > 0) {						//if at least one click was made, we do it
		style.setProperty('--cursorX', x + 'px');
		style.setProperty('--cursorY', y + 'px');
	}

}
let flash = document.getElementById('flash');
let check = 0;

function blink() {							//function that works when clicked in start part, the ain game part, turn on/off the flashlight
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

//updating the flashlight position
document.querySelector('.start').addEventListener('mousemove',update)
document.querySelector('.start').addEventListener('touchmove',update)
