const cube = document.getElementById("cube");
const hint = document.getElementById("hint");

new CubeManager().init(cube); // init a new cube manager

TextLoader.loadText("hint.md", hint); // load a main hint text