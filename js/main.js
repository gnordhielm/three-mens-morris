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


////////// Set Up Players //////////

var playerOneName = "Player One"
var playerTwoName = "Player Two"

function Player(name) {
	this.name = name
	this.pieces = [name, name, name]
	this.turn = false
}

var playerOne = new Player(playerOneName)
var playerTwo = new Player(playerTwoName)

////////// Set Up Board //////////

var board = {
	a1: null,
	a2: null,
	a3: null,
	b1: null,
	b2: null,
	b3: null,
	c1: null,
	c2: null,
	c3: null
}

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

////////// Place Phase //////////




////////// Move Phase //////////



////////// For Playing in Console //////////

// player1 = prompt("What is Player 1's name?")
// player2 = prompt("What is Player 2's name?")

////////// Run  //////////













