
var btnColor = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userPattern = [];
var level = 0;
var btnClickCount;

var start = document.querySelector('.start');

start.addEventListener('click',function () {
	if(level===0) 
	{
		btnClickCount = -1;
		start.style.visibility = 'hidden';
		nextSequence();
	}
});

var reset = document.querySelector('.reset');

reset.addEventListener('click', function (){
	level = 0;
	document.querySelector('h1').textContent = `Press Start Button to Begin`; 
	gamePattern=[];
	userPattern=[];
	start.style.visibility = 'visible';
})

function nextSequence()
{	
	level++;
	document.querySelector('h1').textContent = `Level : ${level}`; 
	let randomNumber = Math.floor(Math.random()*4);
	let randomColor = btnColor[randomNumber];
	gamePattern.push(randomColor);
	let btnSelected = document.querySelector(`div[type="button"][id="${randomColor}"]`);

	btnSelected.classList.add('pressed');
	setTimeout(() => btnSelected.classList.remove("pressed"), 200);

	playSound(randomColor);
	
	btnClickCount = -1;
	userPattern = [];
}

for(let i=0; i<4; i++)
{
	var btnClicked = document.querySelectorAll('div[type="button"]')[i].addEventListener('click', function (e) {clickHandler(e)});
}

function clickHandler(e)
{
	let userColor = e.target.id;
	playSound(userColor);
	userPattern.push(userColor);
	let btnClicked = e.target;
	btnClicked.classList.add('pressed');
	setTimeout(() => btnClicked.classList.remove("pressed"), 100);
	btnClickCount++;
	checkClick(btnClickCount);
}

function checkClick(k)
{
	if(gamePattern[k] === userPattern[k])
	{
		if(k===level-1)
			setTimeout(() => nextSequence(), 500);
	}
	else
	{
		level = 0;
		playSound('wrong');
		document.querySelector('body').classList.add('game-over');
		document.querySelector('h1').textContent = `Game Over!! Click to Restart...`; 
		setTimeout(() => document.querySelector('body').classList.remove("game-over"), 250);
		gamePattern=[];
		start.style.visibility = 'visible';
	}
		
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}