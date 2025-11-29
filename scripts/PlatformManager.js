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
            this.root.style.setProperty('--load-text-scale', '1.6');
            this.root.style.setProperty('--load-text-pos-state', 'static');
            this.root.style.setProperty('--load-text-url', 'url("/resources/misc/load_text_compact.svg")');
            
            this.root.style.setProperty('--scene-offset-y', '10rem');
            this.root.style.setProperty('--font-size', '1.6rem');
        }
        else {
            this.root.style.setProperty('--load-text-scale', '1');
            this.root.style.setProperty('--load-text-pos-state', 'absolute');
            this.root.style.setProperty('--load-text-url', 'url("/resources/misc/load_text.svg")');

            this.root.style.setProperty('--scene-offset-y', '0');
            this.root.style.setProperty('--font-size', '1.1rem');
        }
    }
}