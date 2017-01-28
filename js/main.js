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

