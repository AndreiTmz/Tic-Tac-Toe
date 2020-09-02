var fields;
		var currentPlayer = "X";
		var moves = 0;
		var gameStatus = ['', '', '',
		'','','',
		'','',''];
		var xScoreSpan, oScoreSpan, winnerSpan;
		var xScore = oScore = 0;
		var roundFinished = false;
		var round, roundNumber = 1;
		var nextRoundBtn;

		function checkLines() {
			var firstLine = (gameStatus[0] == gameStatus[1] && gameStatus[0]  == gameStatus[2]) && (gameStatus[0] != '');
			var secondLine = (gameStatus[3] == gameStatus[4] && gameStatus[3] == gameStatus[5]) && (gameStatus[3] != ''); 
			var thirdLine = (gameStatus[6] == gameStatus[7] && gameStatus[6] == gameStatus[8]) && (gameStatus[6] != '');

			return (firstLine || secondLine || thirdLine);
		}

		function checkColumns() {
			var firstCol = gameStatus[0] == gameStatus[3] && gameStatus[0] == gameStatus[6] && gameStatus[0] != '';
			var secondCol = gameStatus[1] == gameStatus[4] && gameStatus[1] == gameStatus[7] && gameStatus[1] != '';
			var thirdCol = gameStatus[2] == gameStatus[5] && gameStatus[2] == gameStatus[8] && gameStatus[2] != '';

			return firstCol || secondCol || thirdCol;
		}

		function checkDiagonals() {
			var principalDiagonal = gameStatus[0] == gameStatus[4] && gameStatus[0] == gameStatus[8] && gameStatus[0] != '';
			var secondaryDiagonal = gameStatus[2] == gameStatus[4] && gameStatus[2] == gameStatus[6] && gameStatus[2] != '';

			return principalDiagonal || secondaryDiagonal;
 		}

		function checkIfWinnerExists() {
			if(checkLines() || checkColumns() || checkDiagonals()) {
				roundFinished = true;
				nextRoundBtn.style.visibility = "visible";
				showWinner();
			}
			else if(gameStatus.indexOf('') == -1) {
				winnerSpan.innerText = "Draw! No one wins round " + roundNumber;
				nextRoundBtn.style.visibility = "visible";
			}
		}

		function showWinner() {
			winner.innerText = "\"" + currentPlayer + "\" wins round " + roundNumber;
				if(currentPlayer == 'X') {
					xScore++;
					xScoreSpan.innerText = xScore;
				}
				else {
					oScore++;
					oScoreSpan.innerText = oScore;
				}
		}

		function clearTable() {
			for(let i = 0; i < fields.length; i++) {
				fields[i].innerText = '';
				gameStatus[i] = '';
			}
		}

		function nextRound() {
			clearTable();
			currentPlayer = "X";
			roundNumber++;
			winner.innerText = "No winner for round " + roundNumber;
			nextRoundBtn.style.visibility = "hidden";
			round.innerText = "Round " + roundNumber; 
			roundFinished = false;
		}

		function resetGame() {
			clearTable();
			winner.innerText = "No winner for round 1";
			xScoreSpan.innerText = 0;
			oScoreSpan.innerText = 0;
			round.innerText = "Round 1";
		}

		document.addEventListener("DOMContentLoaded", function() {

			xScoreSpan = document.getElementById("xScore");
			oScoreSpan = document.getElementById("oScore");
			winnerSpan = document.getElementById("winner");
			round = document.getElementById("round");
			nextRoundBtn = document.getElementById("nextRound");

			fields = document.querySelectorAll(".tableField");
			
			for(let i = 0; i < fields.length; i++) {
				fields[i].addEventListener("click", function() {
					if(gameStatus[i] == '' && !roundFinished)
					{
						moves++;
						fields[i].innerText = currentPlayer;
						gameStatus[i] = currentPlayer;
						
						if(moves >= 5) {
							checkIfWinnerExists();
						}
						currentPlayer = (currentPlayer == "X") ?  "O" : "X";
						document.getElementById("nextPlayer").innerText = currentPlayer;
					}
				});
			}			
		});