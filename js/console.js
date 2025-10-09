const TERMINAL = document.getElementsByTagName("terminal")[0]

var user_input = "";
var cool_user_input = ""; // becomes orange, if user typed a proper command word
var msg  = "";

// current input buffer (terminal's up/down logic)
var buffer = [];
// input buffer index
var buffer_index = 0;

// cariage blink counter
var c_tick = 0;

document.onkeydown = ((e) => {
    if (e.key == "Backspace") {
        user_input = user_input.substring(0, user_input.length - 1);
    }
    if (e.key == "Enter") {
        // set terminal message by user input
        setMsgByInput(user_input);

        // clear user input
        user_input = "";

        // reset input buffer index
        buffer_index = 0;
    }
    if (e.key == "ArrowUp") {
        // decrease buffer index
        if (buffer_index > 0) {
            buffer_index--;
        }
        else if(buffer.length > 0) {
            buffer_index = buffer.length - 1;
        }

        setUserInputByBufferIndex(buffer_index);
    }
    if (e.key == "ArrowDown") {
        // increase buffer index
        buffer_index = (buffer_index < buffer.length - 1) ? buffer_index += 1 : 0;

        setUserInputByBufferIndex(buffer_index);
    }
    if (KEYS.includes(e.key.toUpperCase())) {
        user_input += e.key.toUpperCase();
    }
    updateCoolUserInput();
});

// set default (welcome) message here
msg = MSGS.BACK_MSG;

setInterval(() => {
    // draw current message buffer + user input
    TERMINAL.innerHTML = msg + cool_user_input;

    // add blinking cariage
    TERMINAL.innerHTML = c_tick % 2 == 0 ? TERMINAL.innerHTML + "_" : TERMINAL.innerHTML;

    // affect cariage blink timer
    c_tick++;
}, 100);

function setMsgByInput(input) {
    if (input == COMMANDS.BACK) {
        msg = MSGS.BACK_MSG;
    }
    if (input == COMMANDS.ABOUT) {
        msg = MSGS.ABOUT_MSG;
    }
    if (input == COMMANDS.PROJECTS) {
        msg = MSGS.PROJECTS_MSG;
    }
    if (input == COMMANDS.STATUS) {
        msg = MSGS.STATUS_MSG;
    }
    
    // push last input to the input buffer
    buffer.push(input);
}
function setUserInputByBufferIndex(index) {
    if (buffer.length > 0)
        user_input = buffer[index];
}

function updateCoolUserInput() {
    cool_user_input = user_input;
    Object.entries(COMMANDS).forEach(el => { // el = arrayof[key, val]
        if (user_input == el[1]) {
            cool_user_input = `<o>${user_input}</o>`;
        }
    });
}