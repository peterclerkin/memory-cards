/*
 * Create a list that holds all of your cards
 */

//Array to hold the cards
let deck = $('#deck');
let cardIcons = ["fa-paper-plane-o", "fa-paper-plane-o", "fa-diamond", "fa-diamond", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];
let selectedCard = [];
let allCards = [];
console.log(shuffle(cardIcons));
let moves = 0;
let counter = 0;
let matchedCards = 0;
let time = $('.timer')[0];
let hours = 0,
    mins = 0,
    secs = 0,
    t;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//Run Functions
newCards();
runGame();

//Create cards' HTML
function newCards() {
    cardIcons.forEach(function (cardIcon) {
        $('#deck').append(`<li class="card"><i class="fa ${cardIcon}"></i></li>`);
    });

    // Get all li elements with the card class
    // Must be done at this point after the li's have been dynamically created
    let cards = document.getElementsByClassName("card");
    allCards = Array.from(cards);
}


//Start the game with the clicking, opening and matching of cards :)
function runGame() {
    //Click the card to open it and start the game
    $('.card').on('click', function () {

        this.classList.add('show', 'open');
        selectedCard.push($(this));
        selectedCard[0][0].classList.add('disabled');
        counter++;
        console.log(this.children[0].className);

        //Check if 2 card's are the same and add the 'match' class if they are
        if (counter === 2) {
            
            disableAll();
            moves++;
            moveCounter();

            if (selectedCard[0][0].children[0].className == selectedCard[1][0].children[0].className) {
                selectedCard[0][0].classList.add('match');
                selectedCard[1][0].classList.add('match');
                //Turn off the click so they cannot be clicked again once they're matched
                selectedCard[1][0].classList.add('disabled');
                selectedCard[0].off("click");
                selectedCard[1].off("click");
                selectedCard.length = 0;
                matchedCards += 1;
                enableCards();
                showResults();

            } else {
                //If the cards do not match add the 'wrong' classes and remove the classes so the player is brought back to the default stage
                selectedCard[0][0].classList.add('wrong');
                selectedCard[1][0].classList.add('wrong');
                setTimeout(function () {
                    selectedCard[0][0].classList.remove('open', 'show', 'match', 'wrong', 'disabled');
                    selectedCard[1][0].classList.remove('open', 'show', 'match', 'wrong', 'disabled');
                    selectedCard.length = 0;
                    enableCards();
                }, 400);

            }
            counter = 0;
        }
    });
}

// Loop through all the li elements with the card class and add the disabled class
function disableAll() {
    allCards.forEach(function(card) {
        card.classList.add('disabled');
    });
}

// Loop through all li elements with the card class and remove the disabled class
function enableCards() {
    allCards.forEach(function(card) {
        card.classList.remove('disabled');
    });
}


// Move counter function to update the move number text displayed
function moveCounter() {
    $('.moves').text(moves);
    console.log(moves);
    //Start the timer after the first move is made
    if (moves === 1) {
        second = 0;
        minute = 0;
        timer();
    }

    //Take away stars after a certain amount of moves
    if (moves > 0 && moves <= 15) {
        starScore = "3";

    } else if (moves > 15 && moves <= 25) {
        $("#star3").removeClass("fa-star");
        starScore = "2";

    } else if (moves > 25) {
        $("#star2").removeClass("fa-star");
        starScore = "1";
    }
}

//Adding the timer function
function addTime() {
    secs++;
    if (secs >= 60) {
        secs = 0;
        mins++;
        if (mins >= 60) {
            mins = 0;
            hours++;
        }
    }

    time.textContent = (mins ? (mins > 9 ? mins : "0" + mins) : "0") + " Minutes  " + (secs > 9 ? secs : "0" + secs) + " Seconds";

    timer();
}

function timer() {
    t = setTimeout(addTime, 1000);
}

//Restart the game function
function restartGame() {
    location.reload();
}

//Show the results pop up once game is complete
function showResults() {

    if (matchedCards === 8) {
        clearTimeout(t);
        var modal = document.getElementById('popup');
        var span = document.getElementsByClassName("exit")[0];
        //Display stars/rating
        var starRating = document.querySelector(".stars").innerHTML;
        document.getElementById("starRating").innerHTML = starRating;
        //Display time
        var timings = document.querySelector('.timer').innerHTML;
        document.getElementById("finalTime").innerHTML = timings;
        //Display moves
        $('.moves').text(moves);
        console.log(moves);

        modal.style.display = "block";

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }

        $("#play-again-btn").on("click", function () {
            location.reload()
        });

    }
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

