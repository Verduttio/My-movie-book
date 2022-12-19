export function cutLink(url) {
    const points = url.split('/');
    console.log("Points: ", points);
    console.log("Cut url: ", points[points.length-1]);
    return points[points.length - 1];
}