const TERMINAL = document.getElementsByTagName("terminal")[0]

const KEYS = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
]

const MSGS = {
BACK_MSG: 
`WELCOME TO SUP<o>0</o> TERMINAL :)
IT SUPPORTS ONLY ENGLISH CHARACTERS!

TYPE <o>1</o> OF SPECIFIED BELOW
<o>ABOUT</o>, <o>PROJECTS</o>, <o>STATUS</o>
    
> `,

ABOUT_MSG: 
`I'M SUPCHYAN, GAME DEVELOPER AND SOFTWARE ARCHITECT!
IF YOU WANT TO LEARN ABOUT MY PROJECTS, PLEASE VISIT <o>PROJECTS</o> SECTION.

TYPE <o>BACK</o> TO GET A WELCOME SCREEN

> `,

PROJECTS_MSG: 
`PROJECTS MESSAGE!

TYPE <o>BACK</o> TO GET A WELCOME SCREEN

> `,

STATUS_MSG: 
`LOCATION: JAPAN, TOKYO
LOCAL TIME: 00:00
STATUS: BUSY

TYPE <o>BACK</o> TO GET A WELCOME SCREEN

> `,
}

var input = "";
var buffer = "";
var tick = 0;

document.onkeydown = ((e)=>{
    if (e.key == "Backspace") {
        input = input.substring(0, input.length - 1);
        return;
    }
    if (e.key == "Enter") {
        setBufferByInput();
        return;
    }
    if (KEYS.includes(e.key.toUpperCase())) {
        input += e.key.toUpperCase();
        return;
    }
});

buffer = MSGS.BACK_MSG;

setInterval(() => {
    TERMINAL.innerHTML = buffer + input;
    TERMINAL.innerHTML = tick % 2 == 0 ? TERMINAL.innerHTML + "_" : TERMINAL.innerHTML;
    tick++;
}, 100);

function setBufferByInput() {
    if (input == "BACK") {
        buffer = MSGS.BACK_MSG;
    }
    if (input == "ABOUT") {
        buffer = MSGS.ABOUT_MSG;
    }
    if (input == "PROJECTS") {
        buffer = MSGS.PROJECTS_MSG;
    }
    if (input == "STATUS") {
        buffer = MSGS.STATUS_MSG;
    }
    input = "";
}