/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Player1 = 0; Player2 = 1

var scores, roundScore, activePlayer, gamePlaying, previousDiceRoll;

// Variable for a .dice interaction to use less code later
var diceDOM1 = document.querySelector('.dice1');
var diceDOM2 = document.querySelector('.dice2');

init();


document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
            // 1. Random number 1 to 6
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        
        // 2. Display the resuls
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + dice1 + '.png';
        
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';
        
        
        /*
        // 3. Check IF rolled six twice in a row
        if (dice === previousDiceRoll && dice === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            resetRoundScore();
            document.querySelector('#current-' + activePlayer).textContent = '0';
            nextplayer();
        }
        */
        
        
        // 4. Update the roundScore IF the rolled number a) was NOT a 1 or b) was a 1
        if (dice1 !== 1 && dice2 !==1) {
            // a) Update the roundScore
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // b) Reseting roundScore to 0 
            resetRoundScore();

            //5. Changing active player 
            nextplayer();  
        }
        
        // 6. Update previous dice roll
        //previousDiceRoll = dice;
    }
});

    //HOLD button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Reset previous dice roll
        //previousDiceRoll = 0;
        // Adding current roundScore to the global scores
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        // Winning score set by players
        var input = document.querySelector('.winning-score').value;
        var winningScore
        // brak wartości czyli "" powoduje coerscion na false
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            // Hide the dice and a red dot and add winner class
            diceDOM1.style.display = 'none';
            diceDOM2.style.display = 'none';
            document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
        } else {
             // Reset round score to 0 before change to player becuse of code in nextPlayer function
            resetRoundScore();

            // Change the active player
            nextplayer();
        } 
    } 
});


    // NEW GAME button
document.querySelector('.btn-new').addEventListener('click', init);


// FUNCTIONS


function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    // Setting all the scores to 0
    diceDOM1.style.display = 'none';
    diceDOM2.style.display = 'none';

    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;

    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    
    // Setting player names since one of them is WINNER
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    
    // Setting the red dot to player 1 by first removing active class from both players and then adding to the first one
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    
    // Removing winner style in CSS
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    
    
}


function nextplayer() {
    //4. Changing active player 
    if (activePlayer === 0) {
            activePlayer = 1;  
        } else {
            activePlayer = 0;
        }
        // 5. Moving a red dot in CSS by changing active class between players
        document.querySelector('.player-0-panel').classList.toggle('active');
            document.querySelector('.player-1-panel').classList.toggle('active');
    
        // 6. Hiding the dice
        diceDOM1.style.display = 'none';
        diceDOM2.style.display = 'none';
}
    

function resetRoundScore() {
    //previousDiceRoll = 0;
    roundScore = 0;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
}






/*
document.querySelector('#current-' + activePlayer).textContent = dice;




*/