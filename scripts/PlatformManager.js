/**
 * This class handles platforms' peculiarities to improve a web page's UX.
 */
class PlatformManager {
    constructor() { 
        this.root = document.documentElement;
    }
    init() {
        if (
            navigator.userAgent.includes("Android") ||
            navigator.platform.includes("Android")  ||
            navigator.userAgent.includes("iPhone")  ||
            navigator.platform.includes("iPhone")
        ) {
            this.root.style.setProperty("--load-text-height", "6rem");
            this.root.style.setProperty("--load-text-scale", "1.6");
            this.root.style.setProperty("--load-text-position-set", "static");
            this.root.style.setProperty("--load-text-url", `url("/resources/misc/load_text_compact.svg")`);
            
            this.root.style.setProperty("--scene-scale", ".8");
            this.root.style.setProperty("--scene-y-offset", "10rem");

            this.root.style.setProperty("--font-size", "1.4rem");

            this.root.style.setProperty("--mono-footer-margin-bottom", "2rem");
            this.root.style.setProperty("--mono-title-visibility", "collapse");
        }
        else {
            this.root.style.setProperty("--load-text-height", "3rem");
            this.root.style.setProperty("--load-text-scale", "1");
            this.root.style.setProperty("--load-text-position-set", "absolute");
            this.root.style.setProperty("--load-text-url", `url("/resources/misc/load_text.svg")`);

            this.root.style.setProperty("--scene-scale", "1");
            this.root.style.setProperty("--scene-y-offset", "0");

            this.root.style.setProperty("--font-size", "1.1rem");

            this.root.style.setProperty("--mono-footer-margin-bottom", "0");
            this.root.style.setProperty("--mono-title-visibility", "visible");
            
        }
    }
}