/**
 * This class handles animation logic related to cube's top face.
 */
class CubeTopFaceController {
    constructor() {
        this.segments = [
            document.getElementById("s_0"),
            document.getElementById("s_1"),

            document.getElementById("u_0"),
            document.getElementById("u_1"),

            document.getElementById("p_0"),
            document.getElementById("p_1"),

            document.getElementById("c_0"),
            document.getElementById("c_1"),

            document.getElementById("h_0"),
            document.getElementById("h_1"),
            document.getElementById("h_2"),

            document.getElementById("y_0"),
            document.getElementById("y_1"),
            
            document.getElementById("a_0"),
            document.getElementById("a_1"),

            document.getElementById("n_0"),
            document.getElementById("n_1")
        ];
    }
    /**
     * Starts segments "appear" animation.
     */
    startSegmentsAnimation() {
        this.segments.forEach(seg => {
            seg.classList.add("cell_top_blink");
        });
    }
    /**
     * Starts "O" blink animation (orange shape in bottom right corner).
     */
    startOBlinkAnimation() {
        document.getElementById("o_0").classList.add("o_0_blink");
    }
}