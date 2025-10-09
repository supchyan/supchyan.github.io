const SNAKE_OBJECT  = document.getElementById("snake");
const PLAYER_OBJECT = document.getElementById("player");
const APPLE_OBJECT  = document.getElementById("apple");
const SCORE_OBJECT  = document.getElementById("score");
const TUTORIAL_TXT  = document.getElementById("tutorial_text");
const SEGMENTS_OBJ  = document.getElementById("segments");

// stores all of player's moveset
var POSITION_BUFFER = [];

const PLAYER = {
    DIRECTION: "RIGHT",
    POSITION: {
        X: 0,
        Y: 0
    }
}

const APPLE = {
    POSITION: {
        X: 0,
        Y: 0
    }
}

// it should be 1:1 object, so we pick width for all step math calculations
const STEP = PLAYER_OBJECT.offsetWidth;

var isGameRunning = false;

// tutorial message
TUTORIAL_TXT.innerHTML =
`USE <y>ARROWS</y> TO CONTROL THE SNAKE.
        PRESS <y>X</y> TO EXIT.
`;

function startSnakeGame() {
    document.getElementById("terminal").style.visibility = "collapse";
    document.getElementById("snake").style.visibility = "visible";

    // reset player
    POSITION_BUFFER = [];
    PLAYER.POSITION.X = 0;
    PLAYER.POSITION.Y = 0;
    PLAYER.DIRECTION = "RIGHT";
    
    // remove segments
    while (SEGMENTS_OBJ.firstChild) {
        SEGMENTS_OBJ.removeChild(SEGMENTS_OBJ.firstChild);
    }

    // spawn apple in specified position to prevent "quick start"
    respawnApple(5, 5);

    isGameRunning = true;
}
function stopSnakeGame() {
    document.getElementById("terminal").style.visibility = "visible";
    document.getElementById("snake").style.visibility = "collapse";

    isGameRunning = false;
}

setInterval(() => {
    if (isGameRunning) {
        // player ate an apple
        if (PLAYER.POSITION.X == APPLE.POSITION.X && PLAYER.POSITION.Y == APPLE.POSITION.Y) {
            respawnApple();
            
            // add a new player segment
            const SEGMENT_OBJECT = document.createElement("div")
            SEGMENT_OBJECT.classList.add("segment");
            SEGMENTS_OBJ.appendChild(SEGMENT_OBJECT);
        }

        if (PLAYER.DIRECTION == "RIGHT") {
            PLAYER.POSITION.X += STEP;
        }
        if (PLAYER.DIRECTION == "LEFT") {
            PLAYER.POSITION.X -= STEP;
        }
        if (PLAYER.DIRECTION == "UP") {
            PLAYER.POSITION.Y -= STEP;
        }
        if (PLAYER.DIRECTION == "DOWN") {
            PLAYER.POSITION.Y += STEP;
        }

        if (PLAYER.POSITION.X > window.innerWidth) {
            PLAYER.POSITION.X = 0;
        }
        if (PLAYER.POSITION.X < 0) { 
            // properly calculate back position 
            // according to window size and step size
            // like in `respawnApple()` method.
            PLAYER.POSITION.X = Math.floor(window.innerWidth / STEP) * STEP;
        }
        if (PLAYER.POSITION.Y > window.innerHeight) {
            PLAYER.POSITION.Y = 0;
        }
        if (PLAYER.POSITION.Y < 0) {
            // properly calculate back position 
            // according to window size and step size
            // like in `respawnApple()` method.
            PLAYER.POSITION.Y = Math.floor(window.innerHeight / STEP) * STEP;
        }

        // save a new player position to buffer
        POSITION_BUFFER.push({X: PLAYER.POSITION.X, Y: PLAYER.POSITION.Y});

        const SEGMENT_OBJECTS = document.getElementsByClassName("segment");
        for (var i = 0; i < SEGMENT_OBJECTS.length; i++) {
            var index = POSITION_BUFFER.length - 2 - i;
            if (index >= 0) {
                SEGMENT_OBJECTS[i].style.top = `${POSITION_BUFFER[index].Y}px`;
                SEGMENT_OBJECTS[i].style.left = `${POSITION_BUFFER[index].X}px`;
            }
        }

        // update in-game score
        SCORE_OBJECT.innerHTML = `${SEGMENT_OBJECTS.length}`;
        
        PLAYER_OBJECT.style.top = `${PLAYER.POSITION.Y}px`;
        PLAYER_OBJECT.style.left = `${PLAYER.POSITION.X}px`;
        
        APPLE_OBJECT.style.top = `${APPLE.POSITION.Y}px`;
        APPLE_OBJECT.style.left = `${APPLE.POSITION.X}px`;
    }
}, 100);

// player
function playerRight() {
    if (PLAYER.DIRECTION != "LEFT") {
        PLAYER.DIRECTION = "RIGHT";
    }
        
}
function playerLeft() {
    if (PLAYER.DIRECTION != "RIGHT") {
        PLAYER.DIRECTION = "LEFT";
    }
}
function playerUp() {
    if (PLAYER.DIRECTION != "DOWN") {
        PLAYER.DIRECTION = "UP";
    }
}
function playerDown() {
    if (PLAYER.DIRECTION != "UP") {
        PLAYER.DIRECTION = "DOWN";
    }
}

/**
 * Moves an apple to a different place by spot.
 * @param spotX specified X spot. Set to `0` for random generated one.
 * @param spotY specified Y spot. Set to `0` for random generated one.
 */
function respawnApple(spotX = 0, spotY = 0) {
    // number of spawn spots according to screen width
    var randSpotX = Math.floor(window.innerWidth / STEP);
    // number of spawn spots according to screen height
    var randSpotY = Math.floor(window.innerHeight / STEP);
    // calc explanation:
    // we take random spot value by multipling it to math.random()
    // then multiplying chosen spot value 
    // by in-game step (STEP) to get proper coords for an apple,
    // like a breeze.
    APPLE.POSITION.X = spotX == 0 ? Math.floor(randSpotX * Math.random()) * STEP : spotX * STEP;
    APPLE.POSITION.Y = spotY == 0 ? Math.floor(randSpotY * Math.random()) * STEP : spotY * STEP;
}