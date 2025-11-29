/**
 * This class contains methods to control monologue GUI.
 */
class MonologueController {
    constructor(cubeManager) {
        this.cubeManager = cubeManager;
        this.textLoader = new TextLoader();

        document.getElementById("mono_close_btn").onclick = () => {
            this.close();
        };
        document.getElementById("mono_scroll_btn").onclick = () => {
            this.textLoader.setAutoScroll(!this.textLoader.getAutoScroll());
            this.#setScrollButtonText();
        };
    }
    /**
     * Shows monologue GUI with a specified content.
     * @param {*} contentPath Monologue text content path starting in `/resources/text/`.
     * @param {*} title Monologue title.
     */
    show(contentPath, title) {
        this.textLoader.load(contentPath, document.getElementById("mono_content"), 10);
        document.getElementById("mono_title").innerHTML = title; // set monologue GUI title
        
        document.getElementById("monologue").style.opacity = ".9"; // show monologue GUI
        document.getElementById("monologue").style.pointerEvents = "all"; // add pointer events
        this.#setScrollButtonText();

        this.cubeManager.lock(); // lock cube interactions
    }
    /**
     * Closes monologue GUI.
     */
    close() {
        this.textLoader.stop(); // stop old monologue filling job
        document.getElementById("mono_content").innerHTML = ""; // clear old monologue content

        document.getElementById("monologue").style.opacity = "0"; // hide monologue GUI
        document.getElementById("monologue").style.pointerEvents = "none"; // remove pointer events
        this.cubeManager.unlock(); // unlock cube interactions
    }
    /**
     * Defines state for the auto scroll button.
     */
    #setScrollButtonText() {
        document.getElementById("mono_scroll_btn").innerHTML = this.textLoader.getAutoScroll() ? 
            "Auto scroll: On" : 
            "Auto scroll: Off";
    }
}