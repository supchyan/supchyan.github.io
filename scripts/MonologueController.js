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
        document.getElementById("mono_title").innerHTML = title;
        
        setTimeout(() => { // wait before old data in text loader clear itself.
            document.getElementById("monologue").style.opacity = ".9";
            document.getElementById("monologue").style.pointerEvents = "all";
            this.#setScrollButtonText();
        }, 10);

        this.cubeManager.lock();
    }
    /**
     * Closes monologue GUI.
     */
    close() {
        document.getElementById("monologue").style.opacity = "0";
        document.getElementById("monologue").style.pointerEvents = "none";
        this.cubeManager.unlock();
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