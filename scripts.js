let gameWord = "", gameProgress = 0;
const previousChoicesArray = [];
const gameStatePictures = ['https://iili.io/PBVm1n.png', 'https://iili.io/PBVnNp.png', 'https://iili.io/PBV1xS.png', 'https://iili.io/PBVEW7.png', 'https://iili.io/PBVVfe.png', 'https://iili.io/PBVXUb.png', 'https://iili.io/PBVw5x.gif'];

function storeGameWord() {
	gameWord = document.getElementById('wordField').value;
	document.getElementById('wordField').value = "";
	(document.getElementById('startGameContainer')).hidden = true;
	for(let i = 0; i < gameWord.length; ++i) {  // ads a box with a question mark inside for each word letter
		document.getElementById('wordMainDisplay').innerHTML += "<div class='letter-outer'><div class='letter-inner' id='"+ i +"'>?</div></div>";
	}
	(document.getElementById('inGameContainer')).hidden = false;
	(document.getElementById('bottomArea')).hidden = false;
}

function evaluateLetter() {
	let userChoice = document.getElementById('pickLetterField');
	if (!isUppercase(userChoice.value) || userChoice.value == "") {	// game will only use capital letters A-to-Z
		showMessage("UPPERCASE_ONLY");
	} else if (previousChoicesArray.includes(userChoice.value)) {	// game doesn't accept previous letter choices
		showMessage("PREVIOUS_FORBIDDEN");
	} else {
		let correctChoice = 0, allFieldsDone = 1;
		for (let i = 0; i < gameWord.length; ++i) {					// traverse word - see if letter is present and populate all empty "fields" of that value
			if (userChoice.value == gameWord.charAt(i)) {
				document.getElementById(i).innerHTML = userChoice.value;
				correctChoice = 1;
			}    
			if (document.getElementById(i).innerHTML == '?') {
				allFieldsDone = 0;
			}
		}
		if (correctChoice) {
			showMessage("CORRECT");
		} else {
            showMessage("WRONG");
			++gameProgress;
			document.getElementById("image").src=gameStatePictures[gameProgress];
			if(gameProgress == 6) {
				document.getElementById("image").src=gameStatePictures[gameProgress]; // END GAME - USER LOST
				playAgain();
			}
		}
		if (allFieldsDone) {
			playAgain();
			document.getElementById("image").src='https://iili.io/PBSmEx.gif'; // END GAME - USER WON
			(document.getElementById('bottomArea')).hidden = true;
		}
		previousChoicesArray.push(userChoice.value);
		document.getElementById('previousChoices').innerHTML += userChoice.value + ", ";
		userChoice.value = "";
	}
}

function newGame() {
	(document.getElementById('endGameContainer')).hidden = true;
	(document.getElementById('startGameContainer')).hidden = false;
	document.getElementById('image').innerHTML = 0;
	document.getElementById('wordMainDisplay').innerHTML = "";
	document.getElementById('previousChoices').innerHTML = "Previous choices: ";
	(document.getElementById('inGameContainer')).hidden = true;
	previousChoicesArray.length = 0;
	gameProgress = 0;
	document.getElementById("image").src=gameStatePictures[gameProgress];
}

function playAgain() {
	(document.getElementById('endGameContainer')).hidden = false;
	(document.getElementById('bottomArea')).hidden = true;
}

function isUppercase(testWord) {
	let uppercaseTest = 1;
	for (let i = 0; i < testWord.length; ++i) {
		if (testWord[i] < 'A' || testWord[i] > 'Z') {
			uppercaseTest = 0;
		}
	}
	return uppercaseTest;
}

function startGame() {
		let  userInput= document.getElementById('wordField').value;
		if (!isUppercase(userInput) || userInput == "") {
		showMessage("UPPERCASE_ONLY");
	} else {
		storeGameWord();
	}
}

function hideElement(elementID) {
	document.getElementById(elementID).hidden = true;
}

function showMessage(msgID) {
	document.getElementById(msgID).hidden = false;
	setTimeout(hideElement, 2000, msgID);
}
