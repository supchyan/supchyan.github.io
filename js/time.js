/**
 * Regions list for `getTime()` func.
 */
const REGIONS = {
    TOKYO: "tokyo",
    SPB: "spb"
}

/**
 * 
 * @param region some region specified. You can use `REGIONS` dict to get some of them. 
 * @returns 
 */
function getTime(region) {
    var offset = 0;

    if (region == REGIONS.TOKYO) {
        offset = 9;
    }
    if (region == REGIONS.SPB) {
        offset = 3;
    }

    var h = new Date().getUTCHours() + offset;
    if (h >= 24) h -= 24; // large UTC+n fix

    const m = new Date().getUTCMinutes();
    return `${new String(h).padStart(2, "0")}:${new String(m).padStart(2, "0")}`
}