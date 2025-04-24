let score =JSON.parse(localStorage.getItem('score'));

function reset(){
	score = {
		Win: 0,
		Lose: 0,
		Draw: 0
	}
	document.querySelector('.condition').innerHTML = "Game is Restarted";
	document.querySelector('.picks').innerHTML = "";
	document.querySelector('.dashboard').innerHTML = `wins: ${score.Win} lose: ${score.Lose} Draw: ${score.Draw}`;
}

let isautoplaying = false;
let id;
function autoplay() {
	if (!isautoplaying) {
		id = setInterval(function () {
			let turn = randomNum();
			game(turn);
		}, 1000);
		isautoplaying = true;
	} else {
		clearInterval(id);
		isautoplaying = false;
	}
}
function game(myTurn){
	let comPick=randomNum();
	let result='';
	if(myTurn == 'rock'){
		if(comPick=== 'rock'){
			score.Draw+=1;
			result='Draw' ;
		
		}else if (comPick === 'paper') {
			score.Lose += 1;
			result ='Lose';
		}
		else if (comPick === 'scissors') {
			score.Win += 1;
			result ='Win';
		}
	}
			
	
	else if(myTurn == 'paper'){
		if(comPick=== 'rock'){
			score.Win+=1;
			result='Win';
		}
		else if (comPick === 'paper') {
			score.Draw += 1;
			result='Draw';
		}
		else if (comPick === 'scissors') {
			score.Lose +=1;
			result ='Lose';
		}
	}
		

	
	else if(myTurn == 'scissors'){
		if(comPick=== 'rock'){
			score.Lose+=1;
			result ='Lose';
		}
		else if (comPick === 'paper') {
			score.Win+= 1;
			result = 'win';
		}
		else if (comPick === 'scissors') {
			score.Draw += 1;
			result = 'Draw';
		}
	}

	if(result==='Win'){
		document.querySelector('.condition').innerHTML='You Win.'
	}else if(result==='Lose'){
		document.querySelector('.condition').innerHTML = 'You Lose.'

	}else if(result ==='Draw'){
		document.querySelector('.condition').innerHTML = 'Draw.'
	}

		


	document.querySelector('.picks').innerHTML = `Your pick is ${myTurn} ,Computer pick is ${comPick} `;

	document.querySelector('.dashboard').innerHTML = `wins: ${score.Win} lose: ${score.Lose} Draw: ${score.Draw}`;
	

localStorage.setItem('score' ,JSON.stringify(score));


}



function randomNum(){
	let num=Math.random();
	if(num>=0 && num<1/3){
		return 'rock';
	}else if(num >= 1/3 && num < 2 / 3){
		return 'paper'
	}else if(num >= 2 / 3 && num < 1){
		return 'scissors'
	}
}


document.querySelector('.rockbutton')
	.addEventListener('click', () => {
		game('rock');
	}

	);

document.querySelector('.paperbutton')
	.addEventListener('click', () => {
		game('paper');
	}

	);

document.querySelector('.scissorsbutton')
	.addEventListener('click', () => {
		game('scissors');
	}

);
	
document.body.addEventListener('keydown', (event) => {
	if (event.key ==='r') {
		game('rock');
		}
}
);

document.body.addEventListener('keydown', (event) => {
			if (event.key ==='p') {
				game('paper');
		}
}
);

document.body.addEventListener('keydown', (event) => {
			if (event.key ==='s') {
				game('scissors');
		}
}
);
	


