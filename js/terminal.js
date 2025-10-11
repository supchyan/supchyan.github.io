const TERMINAL = document.getElementById("terminal");

var userInput = "";
var coolUserInput = ""; // becomes orange, if user typed a proper command word
var msg  = "";

// current input buffer (terminal's up/down logic)
var buffer = [];
// input buffer index
var bufferIndex = 0;

// cariage blink counter
var cTick = 0;

document.onkeydown = ((e) => {
    // handle different terminal logic while snake game is active
    if (isGameRunning) {
        if (e.key == "ArrowUp") {
            playerUp();
        }
        if (e.key == "ArrowDown") {
            playerDown();
        }
        if (e.key == "ArrowLeft") {
            // something on down
            playerLeft();
        }
        if (e.key == "ArrowRight") {
            // something on down
            playerRight();
        }

        if (e.key.toUpperCase() == "X") {
             // clear terminal before exiting snake
            TERMINAL.innerHTML = "";
            // exit snake
            stopSnakeGame();
        }
        return; // skip stuff below while snake...
    }
    
    if (e.key == "Backspace") {
        userInput = userInput.substring(0, userInput.length - 1);
    }
    if (e.key == "Enter") {
        // set terminal message by user input
        setMsgByInput(userInput);

        // clear user input
        userInput = "";

        // reset input buffer index
        bufferIndex = 0;
    }
    if (e.key == "ArrowUp") {
        // decrease buffer index
        if (bufferIndex > 0) {
            bufferIndex--;
        }
        else if(buffer.length > 0) {
            bufferIndex = buffer.length - 1;
        }

        setUserInputByBufferIndex(bufferIndex);
    }
    if (e.key == "ArrowDown") {
        // increase buffer index
        bufferIndex = (bufferIndex < buffer.length - 1) ? bufferIndex += 1 : 0;

        setUserInputByBufferIndex(bufferIndex);
    }
    if (KEYS.includes(e.key.toUpperCase())) {
        userInput += e.key.toUpperCase();
    }
    updateCoolUserInput();
});

// set default (welcome) message here
msg = MSGS.BACK_MSG;

setInterval(() => {
    if (!isGameRunning) { // skip call below while snake is active
        // draw current message buffer + user input
        TERMINAL.innerHTML = msg + coolUserInput;

        // add blinking cariage
        TERMINAL.innerHTML = cTick % 2 == 0 ? TERMINAL.innerHTML + "_" : TERMINAL.innerHTML;

        // affect cariage blink timer
        cTick++;
    }
}, 100);

function setMsgByInput(input) {
    if (input == COMMANDS.BACK) {
        msg = MSGS.BACK_MSG;
    }
    if (input == COMMANDS.ABOUT) {
        msg = MSGS.ABOUT_MSG;
    }
    if (input == COMMANDS.STATUS) {
        msg = MSGS.STATUS_MSG;
    }
    if (input == COMMANDS.SNAKE) {
        startSnakeGame();
    }
    if (input == COMMANDS.KUJIRA) {
        // just a placeholder, maybe
        window.location.href = "https://youtu.be/m1IUGdK7X0U?si=MLT8O6iIXqRJn7PY";
    }
    if (input == COMMANDS.EXIT) {
        window.close();
        window.history.back();
        window.location.href = "https://github.com/supchyan";
    }
    
    // push last input to the input buffer
    buffer.push(input);
}
function setUserInputByBufferIndex(index) {
    if (buffer.length > 0)
        userInput = buffer[index];
}

function updateCoolUserInput() {
    coolUserInput = userInput;
    Object.entries(COMMANDS).forEach(el => { // el = arrayof[key, val]
        if (userInput == el[1]) {
            coolUserInput = `<o>${userInput}</o>`;
        }
    });
}