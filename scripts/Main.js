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

// Monologue manager instance
const monoController = new MonologueController(cubeManager);

// init a new cube manager
cubeManager.init(cube);

var isClickable = false;

var down_client_vec = { X: 0, Y: 0 };
var up_client_vec   = { X: 0, Y: 0 };

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
        isClickable = false;
        textLoader.load(`/tooltips/${tooltip}`, hint, 10);
    }
    element.onpointerleave = () => {
        isClickable = true; // set show hint flag

        setTimeout(() => { 
            if (isClickable) { // if show hint flag is still `true` (i. e. nothing hovered after some delay), show hint tooltip.
                textLoader.load("/tooltips/hint_tooltip.md", hint, 10);
            }
        }, 100);
    }
}

// wait for `2s` to let cube appear
setTimeout(() => {  
    // load hint text
    textLoader.load("/tooltips/hint_tooltip.md", hint, 10);

    // --- CLICK EVENTS ---

    // logo
    registerEvents(cube_top, "logo_tooltip.md");
    // aeno
    registerEvents(cube_bottom, "ao_tooltip.md", "aeno", "ao_mono.md");
    // lolibar
    registerEvents(cube_left, "lb_tooltip.md", "lolibar", "lb_mono.md");
    // kimiavatars
    registerEvents(cube_right, "ka_tooltip.md", "kimiavatars", "ka_mono.md");
    // de_things
    registerEvents(cube_front, "dt_tooltip.md", "de:things", "dt_mono.md");
    // m_project
    registerEvents(cube_back, "mp_tooltip.md", "m:project", "mp_mono.md");

    // ---

}, 2000);