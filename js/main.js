console.log("main.js is connected...")
/*

user arrives - prompted for two player names. 

(if name === 'Ira' or 'Kate', offer explanation message
	cool-button      not-cool-button
	  continue on       apology and animation to 404-error
)

offer some instructions:
	the board is empty to begin.
	players take turns placing each of their three tokens.
	that done, players take turns jumping their pieces.
	You can move a piece to any open, non-adjacent spot.

	You win, just as in tic-tac-toe, when you get three pieces in a row.

	continue-button
	conintue to game

render game board:
board
player names, pieces displayed below 
stage - place pieces or move pieces
flip for first

function - flip for first. Tie it to a button to decide who gets to go first. 

first player's gui is highlighted, they click a piece, a place on the board, 
second player's gui is highlighted. 

when all the pieces are placed, the game switches to a "move" stage.

now, each player clicks a piece - possible moves are highlighted, and they click
the destination.

as soon as one player has three consecutive pieces, a popup appears: 
			"Player X wins!"
			play again
				on click, re-render the game with the names intact.
*/

////////// Global Variables //////////

var playerOneName = "Player One"
var playerTwoName = "Player Two"

////////// Opening Interface //////////

form = document.getElementsByTagName('form')[0]
formWrapper = document.getElementsByClassName('input')[0]

nameOneField = document.getElementById('playerOneName')
nameTwoField = document.getElementById('playerTwoName')

messageWrapper = document.getElementsByClassName('message')[0]
instructionsWrapper = document.getElementsByClassName('instructions')[0]


form.addEventListener('submit', function(event){
	event.preventDefault()
	if (nameOneField.value !== "") playerOneName = nameOneField.value
	if (nameTwoField.value !== "") playerTwoName = nameTwoField.value
	if ((nameOneField.value === "Kate" || nameTwoField.value === "Kate") 
	  ||(nameOneField.value === "Ira" || nameTwoField.value === "Ira")) {
		messageWrapper.style.display = 'block'
	} else {
		instructionsWrapper.style.display = 'block'
	}
	formWrapper.style.display = 'none'
})

messageButton = document.getElementById('messageButton')

messageButton.addEventListener('click', function(event){
	messageWrapper.style.display = 'none'
	instructionsWrapper.style.display = 'block'
})

instructionsButton = document.getElementById('instructionsButton')
gameWrapper = document.getElementsByClassName('game')[0]

instructionsButton.addEventListener('click', function(event){
	instructionsWrapper.style.display = 'none'
	gameWrapper.style.display = 'block'
})

////////// Set Up Players //////////


function Player(name) {
	this.name = name
	this.pieces = [null, null, null]
	this.turn = false
}

var playerOne = new Player(playerOneName)
var playerTwo = new Player(playerTwoName)

////////// Set Up Board //////////

var gameBoard = [
	"a1", "a2", "a3",
	"b1", "b2", "b3",
	"c1", "c2", "c3"
]

function coinToss(pOne, pTwo) {
	switch(Math.floor(Math.random() * 2)) {
		case 0:
			pOne.turn = true
			break;
		case 1:
			pTwo.turn = true
			break;
	}
}

////////// Start Game //////////

function checkForWin(player) {
	if (player.pieces.indexOf(null) !== -1) {
		// check for unplayed pieces
		return false
	} else if (player.pieces[0][0] === player.pieces[1][0] && 
			   player.pieces[0][0] === player.pieces[2][0]) {
		// horizontal win
		return true
	} else if (player.pieces[0][1] === player.pieces[1][1] && 
			   player.pieces[0][1] === player.pieces[2][1]) {
		// vertical win
		return true
	} else if (player.pieces[0] === 'a1' && 
			   player.pieces[0] === 'b2'&& 
			   player.pieces[0] === 'c3') {
		// l > r diagonal win
		return true
	} else if (player.pieces[0] === 'a3' && 
			   player.pieces[0] === 'b2'&& 
			   player.pieces[0] === 'c1') {
		//r > l diagonal win
		return true
	} else {
		return false
	}
}

function nextTurn(pOne, pTwo) {
	if (pOne.turn === true) {
		pOne.turn === false
		pTwo.turn === true
	} else {
		pOne.turn === true
		pTwo.turn === false
	}
}

////////// Place Phase //////////

function isLegalPlace(destination) {
	if (playerOne.pieces.indexOf(destination) !== -1) {
		return false
	} else if (playerTwo.pieces.indexOf(destination) !== -1) {
		return false
	} else {
		return true
	}
}

function placePiece(player, destination) {
	player.pieces[player.pieces.indexOf(null)] = destination
}

////////// Move Phase //////////

function isLegalMove(location, destination) {
	if (playerOne.pieces.indexOf(destination) !== -1) {
		return false
	} else if (playerTwo.pieces.indexOf(destination) !== -1) {
		return false
	} else if ((location[0] === destination[0]) && 
		      Math.abs(location.charCodeAt(1) - destination.charCodeAt(1)) === 1) {
		// horizontal adjacency
		return false
	} else if ((location[1] === destination[1]) && 
		      Math.abs(location.charCodeAt(0) - destination.charCodeAt(0)) === 1) {
		// vertical adjacency
		return false
	} else {
		return true
	}
}

function movePiece(player, location, destination) {
	player.pieces[player.pieces.indexOf(location)] = destination
}













