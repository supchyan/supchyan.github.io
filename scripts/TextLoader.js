class TextLoader {
    constructor() {
        this.isFilling = false;
        this.isAutoScrolling = true;
        this.fillInterval;
    }
    
    // Fills element with a text like in videogames!
    #fill(str, textElement, fillDelay) {
        this.stop();

        this.isFilling = true;
        this.isAutoScrolling = true;

        // Clear an old content if exist
        textElement.innerHTML = "";

        var i = 0;

        this.fillInterval = setInterval(() => {
            if (i < str.length) {
                textElement.innerHTML += str[i];
                if (this.isAutoScrolling) {
                    textElement.scroll({
                        top: textElement.offsetHeight,
                        behavior: "smooth",
                    });
                }
                i++;
            }
            else {
                clearInterval(this.fillInterval);
                this.isFilling = false;
            }
        }, fillDelay);
    }

    /**
     * Loads text from a file in specified `Element` with a delay.
     * @param {*} input Path to the text file starting in `/resources/text/` directory. If input path is invalid (404 reponse), this method will show `input` as a raw string instead.
     * @param {*} textElement `Element` type.
     * @param {*} fillDelay Delay between characters to show. Less delay shows text faster.
     */
    load(input, textElement, fillDelay) {
        fetch(`/resources/text/${input}`)
        .then(res => {
            if (res.status == 200) { // fetch te
                res.text().then((data) => {
                    // Fill with a new content
                    this.#fill(data, textElement, fillDelay);
                });
            }
            else {
                this.#fill(input, textElement, fillDelay);
            }
        });
    }

    /**
     * Stops text filling job if exists.
     */
    stop() {
        if (this.isFilling) {
            // stop old fill logic to prevent text overflows
            clearInterval(this.fillInterval);
            this.isFilling = false;
        }
    }

    /**
     * Returns current auto-scroll state.
     */
    getAutoScroll() {
        return this.isAutoScrolling;
    }

    /**
     * Sets text fill auto-scroll state whenever it's needed.
     */
    setAutoScroll(value) {
        this.isAutoScrolling = value;
    }
}