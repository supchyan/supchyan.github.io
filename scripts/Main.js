const cube = document.getElementById("cube");
const hint = document.getElementById("hint");

const cubeManager = new CubeManager();
const hintManager = new HintManager();

cubeManager.init(cube);
hintManager.init(hint);