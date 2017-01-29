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

////////// Gameplay Global Variables //////////

var playerOne
var playerTwo

var playerOneName = "Player One"
var playerTwoName = "Player Two"

var playerOnePanel = document.getElementById('playerOnePanel')
var playerTwoPanel = document.getElementById('playerTwoPanel')

var coinTossButton = document.getElementById('coinTossButton')
var restartButton = document.getElementById('restartButton')
var restartToken = false

var turnIndicator = document.getElementById('indicator')

var boardPositions = {
	a:'38px',
	b:'190px',
	c:'342px',
	1:'38px',
	2:'190px',
	3:'342px'
}

var playedPieces = 0
var spaces = document.getElementsByClassName('space')
var playerOnePieces = document.getElementsByClassName('playerOnePiece')
var playerTwoPieces = document.getElementsByClassName('playerTwoPiece')

////////// Welcome Interface //////////

var form = document.getElementsByTagName('form')[0]
var formWrapper = document.getElementsByClassName('input')[0]

var nameOneField = document.getElementById('playerOneName')
var nameTwoField = document.getElementById('playerTwoName')

var messageWrapper = document.getElementsByClassName('message')[0]
var instructionsWrapper = document.getElementsByClassName('instructions')[0]


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

var messageButton = document.getElementById('messageButton')

messageButton.addEventListener('click', function(event){
	messageWrapper.style.display = 'none'
	instructionsWrapper.style.display = 'block'
})

var instructionsButton = document.getElementById('instructionsButton')
var gameWrapper = document.getElementsByClassName('game')[0]

instructionsButton.addEventListener('click', function(event){
	instructionsWrapper.style.display = 'none'
	makePlayers()
	gameWrapper.style.display = 'block'
})

////////// Set Up Game //////////


function Player(name) {
	this.name = name
	this.pieces = [null, null, null]
	this.turn = false
}


function makePlayers() {
	playerOne = new Player(playerOneName)
	playerTwo = new Player(playerTwoName)
	playerOnePanel.getElementsByTagName('h1')[0].innerHTML = playerOneName
	playerTwoPanel.getElementsByTagName('h1')[0].innerHTML = playerTwoName
}

function makeBoard() {
	for (var i = 0; i < spaces.length; i++) {
		spaces[i].addEventListener('click', function(event){
			if (playerOne.turn) {
				playPlaceTurn(playerOne, this.id)
			} else {
				playPlaceTurn(playerTwo, this.id)
			}
			if (playedPieces === 6) startMovePhase()
		})
	}
}

function coinToss() {
	switch(Math.floor(Math.random() * 2)) {
		case 0:
			playerOne.turn = true
			break;
		case 1:
			playerTwo.turn = true
			break;
	}
}

coinTossButton.addEventListener('click', function(event){
	coinToss()
	document.getElementById('coinToss').style.display = 'none'
	document.getElementById('gameBoard').style.display = 'block'
	if (!restartToken) makeBoard()
	if (playerOne.turn) {
		turnIndicator.className = "left"
	} else {
		turnIndicator.className = "right"
	}

})

restartButton.addEventListener('click', function(event){
	// board doesn't get made again
	restartToken = true
	// turn indicator is offscreen
	turnIndicator.className = "off"
	// pieces are up top
	for (var i = 0; i < playerOnePieces.length; i++) {
		playerOnePieces[i].style.top = '-100px'
	}
	for (var i = 0; i < playerTwoPieces.length; i++) {
		playerTwoPieces[i].style.top = '-100px'
	}
	playerOnePieces[0].style.left = '133px'
	playerOnePieces[1].style.left = '73px'
	playerOnePieces[2].style.left = '13px'
	playerTwoPieces[0].style.left = '360px'
	playerTwoPieces[1].style.left = '300px'
	playerTwoPieces[2].style.left = '240px'
	// player.pieces are all null
	playerOne.pieces = [null, null, null]
	playerTwo.pieces = [null, null, null]
	// player.turn are both false
	playerOne.turn = false
	playerTwo.turn = false
	// coin toss, not game board, is visible
	document.getElementById('coinToss').style.display = 'block'
	document.getElementById('gameBoard').style.display = 'none'
})

////////// Start Game //////////

// question - I specifically put checkForWin AFTER updateBoard, so that the
//   board would reflect a win before announcing it... 
//   why is it firing an alert, and halting the animation?

function playPlaceTurn(player, destination) {
	if (isLegalPlace(destination)) {
		placePiece(player, destination)
		updateBoard(player)
		if (checkForWin(player)) {
			winner(player)
		} else {
			nextTurn()
		}
	} else {
		alert("That spot is taken!")
	}
}

function updateBoard(player) {
	playerPieces = playerOne.turn ? playerOnePieces : playerTwoPieces
	for (var i = 0; i < playerPieces.length; i++) {
		if (player.pieces[i]) {
			playerPieces[i].style.top = boardPositions[player.pieces[i][0]]
			playerPieces[i].style.left = boardPositions[player.pieces[i][1]]
		}
	}
}

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
	} else if (player.pieces.includes('a1') && 
			   player.pieces.includes('b2')&& 
			   player.pieces.includes('c3')) {
		// l > r diagonal win
		return true
	} else if (player.pieces.includes('a3') && 
			   player.pieces.includes('b2')&& 
			   player.pieces.includes('c1')) {
		//r > l diagonal win
		return true
	} else {
		return false
	}
}

function nextTurn() {
	if (playerOne.turn === true) {
		playerOne.turn = false
		playerTwo.turn = true
		turnIndicator.className = "right"
	} else {
		playerOne.turn = true
		playerTwo.turn = false
		turnIndicator.className = "left"
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
	playedPieces ++
}

////////// Move Phase //////////

function startMovePhase() {
	// for loop to give pieces onclick trigger. Differentiate between black and white.
	// make a variable to hold a move as it's built up - location and destination
	//collapse the holder div
}

function playMoveTurn(player, location, destination) {
	if (isLegalPlace(destination)) {
		placePiece(player, destination)
		if (checkForWin(player)) {
			winner(player)
		} else {
			nextTurn()
		}
	} else {
		alert("You can't move there!")
	}
}

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

function winner(player) {
	alert(player.name + " wins the game!")
}











