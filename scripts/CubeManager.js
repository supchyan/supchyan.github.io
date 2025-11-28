class CubeManager {
    constructor() {
        // whenever cube can be controlled by a user.
        this.locked = false;

        // whenever the cube is controllable
        this.controllable = false; 

        this.old_time = Date.now(); // script load time
        this.start_delay = 2000; // delay in ms before manager starts it's work

        this.start_vec   = { X: 0,  Y: 0  }; // start point when pointer pressed
        this.old_vec     = { X: 0,  Y: 0  }; // old cube rotation vector

        // vectors below is not a `vec2.zero`,
        // because i want to force cube rotate on page load
        // after `locked` trigger begones.
        this.cube_vec    = { X: 0,  Y: 90 }; // initial cube rotation vector
        this.target_vec  = { X: 45, Y: 25 }; // target rotation vector

        // pointer events
        document.body.onpointerdown = (ev => this.on_down(ev));
        document.body.onpointerup   = (ev => this.on_up(ev));
        document.body.onpointermove = (ev => this.on_move(ev));
    }

    on_down(ev) {
        this.start_vec = { X: ev.clientX, Y: ev.clientY };
        this.controllable = !this.locked ? true : false;
    }

    on_up(ev) {
        this.controllable = false;
    }

    on_move(ev) {
        if (this.controllable) {
            this.target_vec = {
                X: ev.clientX - this.start_vec.X + this.old_vec.X,
                Y: ev.clientY - this.start_vec.Y + this.old_vec.Y
            };
        }
    }

    init(cube) {
        this.lock(); // prevent cube from being controlled on init
        setTimeout(() => { // wait for 2s before begin
            this.unlock(); // release cube lock
            setInterval(() => {
                var dist_vec = { X: this.target_vec.X - this.cube_vec.X, Y: this.target_vec.Y - this.cube_vec.Y };

                this.cube_vec.X += (dist_vec.X * 0.06);
                this.cube_vec.Y += (dist_vec.Y * 0.06);

                if (this.cube_vec.Y > 90) this.cube_vec.Y = 90;
                if (this.cube_vec.Y < -90) this.cube_vec.Y = -90;

                if(!this.controllable) {
                    this.old_vec = { X: this.cube_vec.X, Y: this.cube_vec.Y };
                }

                cube.style.transform = `rotateX(${-this.cube_vec.Y}deg) rotateY(${this.cube_vec.X}deg)`;
            }, 1);
        }, 2000);
    }

    /**
     * Locks the cube from being controlled by a user.
     */
    lock() {
        this.locked = true;
    }
    /**
     * Unlocks the cube to make it controllable by a user.
     */
    unlock() {
        this.locked = false;
    }
}