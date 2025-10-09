const PLAYER_OBJECT = document.getElementById('player');
const APPLE_OBJECT = document.getElementById('apple');
const SCORE_OBJECT = document.getElementById('score');

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

var gameScore = 0;
var isGameRunning = false;

function startSnakeGame() {
    document.getElementById('terminal').style.visibility = 'collapse';
    document.getElementById('snake').style.visibility = 'visible';

    respawnApple();

    isGameRunning = true;
}
function stopSnakeGame() {
    document.getElementById('terminal').style.visibility = 'visible';
    document.getElementById('snake').style.visibility = 'collapse';

    // reset player
    PLAYER.POSITION.X = 0;
    PLAYER.POSITION.Y = 0;
    PLAYER.DIRECTION = "RIGHT";

    // reset score
    gameScore = 0;

    isGameRunning = false;
}

setInterval(() => {
    if (isGameRunning) {
        if (PLAYER.DIRECTION == "RIGHT") {
            PLAYER.POSITION.X += 40;
        }
        if (PLAYER.DIRECTION == "LEFT") {
            PLAYER.POSITION.X -= 40;
        }
        if (PLAYER.DIRECTION == "UP") {
            PLAYER.POSITION.Y -= 40;
        }
        if (PLAYER.DIRECTION == "DOWN") {
            PLAYER.POSITION.Y += 40;
        }

        // player ate an apple
        if (PLAYER.POSITION.X == APPLE.POSITION.X && PLAYER.POSITION.Y == APPLE.POSITION.Y) {
            respawnApple();
            gameScore++;
        }

        // update in-game score
        SCORE_OBJECT.innerHTML = `${gameScore}`;

        PLAYER_OBJECT.style.top = `${PLAYER.POSITION.Y}px`;
        PLAYER_OBJECT.style.left = `${PLAYER.POSITION.X}px`;
        
        APPLE_OBJECT.style.top = `${APPLE.POSITION.Y}px`;
        APPLE_OBJECT.style.left = `${APPLE.POSITION.X}px`;
    }
}, 100);

// player
function playerRight() {
    if (PLAYER.DIRECTION != "LEFT")
        PLAYER.DIRECTION = "RIGHT";
}
function playerLeft() {
    if (PLAYER.DIRECTION != "RIGHT")
        PLAYER.DIRECTION = "LEFT";
}
function playerUp() {
    if (PLAYER.DIRECTION != "DOWN")
        PLAYER.DIRECTION = "UP";
}
function playerDown() {
    if (PLAYER.DIRECTION != "UP")
        PLAYER.DIRECTION = "DOWN";
}

//apple
function respawnApple() { // actually, it just moves an apple to the different spot
    // number of spawn spots according to screen width
    var randSpotX = Math.floor(window.innerWidth / 40);
    // number of spawn spots according to screen height
    var randSpotY = Math.floor(window.innerHeight / 40);
    // calc explanation:
    // we take random spot value by multipling it to math.random()
    // then multiplying chosen spot value 
    // by in-game step (40) to get proper coords for an apple,
    // like a breeze.
    APPLE.POSITION.X = Math.floor(randSpotX * Math.random()) * 40;
    APPLE.POSITION.Y = Math.floor(randSpotY * Math.random()) * 40;

    console.log(APPLE.POSITION.X, APPLE.POSITION.Y);
}