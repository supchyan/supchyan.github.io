// Cube element
const cube = document.getElementById("cube");

// Cube faces elements
const cube_top      = document.getElementById("cube_top");
const cube_bottom   = document.getElementById("cube_bottom");
const cube_left     = document.getElementById("cube_left");
const cube_right    = document.getElementById("cube_right");
const cube_front    = document.getElementById("cube_front");
const cube_back     = document.getElementById("cube_back");

// Hint element
const hint = document.getElementById("hint");

// Text loader instance
const textLoader = new TextLoader();

// Cube manager instance
const cubeManager = new CubeManager();

// Platform manager instance
const platformManager = new PlatformManager();

// Monologue controller instance
const monoController = new MonologueController(cubeManager);

// Cube top face controller instance
const ctfController = new CubeTopFaceController();

var is_pointer_entered = false; // whenever pointer is inside a cube face

var down_client_vec = { X: 0, Y: 0 }; // pointer position on down invoked
var up_client_vec   = { X: 0, Y: 0 }; // pointer position on up invoked

// Registers events for specified cube face element
function registerEvents(element, tooltip, monologue_title = null, monologue = null) {
    element.onpointerdown = (ev) => {
        down_client_vec = { X: ev.clientX, Y: ev.clientY };
    }
    element.onpointerup = (ev) => {
        up_client_vec = { X: ev.clientX, Y: ev.clientY };
    }

    element.onclick = () => {
        if (monologue != null) { // prevent monologue show logic, if no content provided.
            // show monolouge if user didn't rotate cube 
            // (i.e. pointer down vector equals to pointer up vector)
            if (down_client_vec.X == up_client_vec.X && down_client_vec.Y == up_client_vec.Y) {
                monoController.show(`/monologues/${monologue}`, monologue_title);
            }
        }
    }

    element.onpointerenter = () => {
        is_pointer_entered = true;
        textLoader.load(`/tooltips/${tooltip}`, hint, 10);
    }
    element.onpointerleave = () => {
        is_pointer_entered = false;

        setTimeout(() => {
            // this check is needed in a case when user swaps pointer focus between faces
            // so it waits for `10ms` expecting to user's face focus event, 
            // shows a hint tooltip otherwise
            if (!is_pointer_entered) { // if this flag is still `false`, show a hint tooltip
                textLoader.load("/tooltips/hint_tooltip.md", hint, 10);
            }
        }, 10);
    }
}

// setup platform stuff
platformManager.init();

document.onreadystatechange = () => {
    if (document.readyState == "complete") {
        // hide loading screen
        document.getElementById("loading").style.opacity = "0";

        setTimeout(() => { // hide loading screen to enable pointer events on cube
            document.getElementById("loading").style.visibility = "collapse";
        }, 500); // 500ms, because loading screen has the same time transition length

        // init a new cube manager
        cubeManager.init(cube);

        ctfController.startSegmentsAnimation();

        // wait for `2s` to let cube appear
        setTimeout(() => {
            // load hint text
            textLoader.load("/tooltips/hint_tooltip.md", hint, 10);

            // set click events for cube faces.
            // i set it here, because i want to prevent 
            // some tooltip drawing logic 
            // before cube has finished it's `init()` job
            registerEvents(cube_top, "logo_tooltip.md");                                // logo
            registerEvents(cube_bottom, "ao_tooltip.md", "aeno", "ao_mono.md");         // aeno
            registerEvents(cube_left, "lb_tooltip.md", "lolibar", "lb_mono.md");        // lolibar
            registerEvents(cube_right, "ka_tooltip.md", "kimiavatars", "ka_mono.md");   // kimiavatars
            registerEvents(cube_front, "dt_tooltip.md", "de:things", "dt_mono.md");     // de_things
            registerEvents(cube_back, "mp_tooltip.md", "m:project", "mp_mono.md");      // m_project
            
            // start "O" thing blinking animation
            ctfController.startOBlinkAnimation();
        
        }, 2000);
    }
}