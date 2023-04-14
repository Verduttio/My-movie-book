export function cutLinkToFilmwebFormat(url) {
    const points = url.split('/');
    console.log("Points: ", points);
    let cutUrl = points[points.length - 1];
    console.log("Cut url: ", cutUrl);
    return cutUrl;
}

export function cutLinkToIMDbFormat(url) {
    const points = url.split('/');
    console.log("Points: ", points);
    let cutUrl = points[points.length - 1];
    console.log("Cut url: ", cutUrl);
    cutUrl = substringToSecondHyphen(cutUrl);
    console.log("Cut url to second hyphen: ", cutUrl);
    return cutUrl;
}

function substringToSecondHyphen(str) {
    const firstHyphenIndex = str.indexOf('-'); // find first hyphen index
    const secondHyphenIndex = str.indexOf('-', firstHyphenIndex + 1); // find second hyphen index

    if (secondHyphenIndex === -1) {
        return str; // return whole string if there is no second hyphen
    } else {
        return str.substring(0, secondHyphenIndex); // return substring from 0 to second hyphen index
    }
}