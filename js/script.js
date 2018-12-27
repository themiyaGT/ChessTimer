// timer objects with initial values
var timer1 = {
    idx: 1, //timer 1 object
    label: '4m 0s', //UI label
    min: 4,
    sec: 0
};
var timer2 = {
    idx: 2, //timer 2 object
    label: '4m 0s', //UI label
    min: 4,
    sec: 0
};

//references to timer processes
var timerProcess1;
var timerProcess2;

// displays default values on page load
window.onload = function () {
    document.getElementById("timer-1-label").innerHTML = timer1.label;
    document.getElementById("timer-2-label").innerHTML = timer2.label;
};

// executes upon Player 1 button press
function player1BtnPress() {
    clearInterval(timerProcess1);
    document.getElementById("player-1-start-btn").disabled = true;  // setting clicked timer button disabled
    document.getElementById("player-2-start-btn").disabled = false; // setting clicked timer button disabled
    timerProcess2 = setInterval(function () { keepTimer(timer2); }, 1000);  // starting the timer
}

// executes upon Player 2 button press
function player2BtnPress() {
    clearInterval(timerProcess2);
    document.getElementById("player-1-start-btn").disabled = false; // setting clicked timer button disabled
    document.getElementById("player-2-start-btn").disabled = true;  // setting clicked timer button disabled
    timerProcess1 = setInterval(function () { keepTimer(timer1); }, 1000);  // starting the timer
}

/*
* this function runs the timers
* @param timer - the timer object for current player
*/
function keepTimer(timer) {
    // subtracting 1 second from the timer
    if (timer.sec == 0) {
        // calculation for passing a minute
        timer.min--;
        timer.sec = 60;
    }
    timer.sec--;

    timer.label = timer.min + "m " + timer.sec + "s";   // setting label with new time value
    if (timer.idx == 1) {
        // updating UI for timer 1
        document.getElementById("timer-1-label").innerHTML = timer.label;
    } else if (timer.idx == 2) {
        // updating UI for timer 2
        document.getElementById("timer-2-label").innerHTML = timer.label;
    }

    // timer reaching 0 state according to timer id & win conditions
    if (timer.min == 0 && timer.sec == 0) {
        if (timer.idx == 1) {
            document.getElementById("timer-1-label").innerHTML = 0 + "m " + 0 + "s";

            //wait for UI to complete countdown
            setTimeout(() => { alert("Time is up! Player 2 Wins!"); }, 500);
            setTimeout(() => { resetGame(); }, 500);
        } else if (timer.idx == 2) {
            document.getElementById("timer-2-label").innerHTML = 0 + "m " + 0 + "s";

            //wait for UI to complete countdown
            setTimeout(() => { alert("Time is up! Player 1 Wins!"); }, 500);
            setTimeout(() => { resetGame(); }, 500);
        } else { } //no branch logic currently because application only supports timer 1 & 2
    }
}

/*
* this function resets the game
* clearing timer intervals, resetting timer objects and updating the UI happen here
*/
function resetGame() {
    //enable buttons
    document.getElementById("player-1-start-btn").disabled = false;
    document.getElementById("player-2-start-btn").disabled = false;

    //clear any running intervals
    clearInterval(timerProcess1);
    clearInterval(timerProcess2);

    //reset timer values
    timer1.label = "4m 00s";
    timer1.min = 4;
    timer1.sec = 0;
    timer2.label = "4m 00s";
    timer2.min = 4;
    timer2.sec = 0;

    //refresh timer display
    document.getElementById("timer-1-label").innerHTML = timer1.label;
    document.getElementById("timer-2-label").innerHTML = timer2.label;
}