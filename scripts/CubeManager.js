// cube object
const cube = document.getElementById("cube");

// true on page load, false after `start_delay` passed, 
// so the cube is ready to be controlled
var locked = true;

// whenever the cube is controllable
var controllable = false; 

var old_time = Date.now(); // script load time
var start_delay = 2000; // delay in ms before manager starts it's work

var start_vec   = { X: 0,  Y: 0  }; // start point when pointer pressed
var old_vec     = { X: 0,  Y: 0  }; // old cube rotation vector
var cube_vec    = { X: 0,  Y: 90 }; // initial cube rotation vector
var target_vec  = { X: 45, Y: 25 }; // target rotation vector

function on_down(ev) {
    start_vec = { X: ev.clientX, Y: ev.clientY };
    controllable = !locked ? true : false;
}

function on_up(ev) {
    controllable = false;
}

function on_move(ev) {
    if (controllable) {
        target_vec = {
            X: ev.clientX - start_vec.X + old_vec.X,
            Y: ev.clientY - start_vec.Y + old_vec.Y
        };
    }
}

// pointer
document.body.onpointerdown = (ev => on_down(ev));
document.body.onpointerup   = (ev => on_up(ev));
document.body.onpointermove = (ev => on_move(ev));


setInterval(() => {
    if (locked) {
        if (Date.now() - old_time > start_delay) { // wait for 2 seconds before start
            locked = false;
        }
        return;
    }
    var dist_vec = { X: target_vec.X - cube_vec.X, Y: target_vec.Y - cube_vec.Y };

    cube_vec.X += (dist_vec.X * 0.06);
    cube_vec.Y += (dist_vec.Y * 0.06);

    if (cube_vec.Y > 90) cube_vec.Y = 90;
    if (cube_vec.Y < -90) cube_vec.Y = -90;

    if(!controllable) {
        old_vec = { X: cube_vec.X, Y: cube_vec.Y };
    }

    cube.style.transform = `rotateX(${-cube_vec.Y}deg) rotateY(${cube_vec.X}deg)`;
}, 1);
