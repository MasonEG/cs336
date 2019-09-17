/**
 * Represents an RGBA color. Values should normally be in the range [0.0, 1.0].
 * @constructor
 * @param {Number} r - red value (default 0.0)
 * @param {Number} g - green value (default 0.0)
 * @param {Number} b - blue value (default 0.0)
 * @param {Number} a - alpha value (default 1.0)
 */
function Color(r, g, b, a)
{
	this.r = (r ? r : 0.0);
	this.g = (g ? g : 0.0);
	this.b = (b ? b : 0.0);
	this.a = (a ? a : 1.0);
}

/**
 * Interpolates a color value within a rectangle based on an
 * x, y offset from the lower left corner.  The base of the rectangle is
 * always aligned with the bottom of the canvas.  Returns null if the given
 * offset does not lie within the rectangle.
 * @param {Number} x - offset from left side
 * @param {Number} y - offset from bottom
 * @param {Number} base - base of rectangle
 * @param {Number} height - height of triangle
 * @param {Color[]} colors - colors of the four corners, counterclockwise
 *   from lower left
 * 32
 * 01
 * @return {Color} interpolated color at offset (x, y)
 */
function findRGB(x, y, width, height, colors)
{
    if(!((0<= x <= width) && (0<= y <= height))) return null;
    
    let maxXPoint = (y > x) ? colors[2]: colors[1],
    maxYPoint = (y > x) ? colors[3]: colors[2];

    let diffRX = maxXPoint.r - colors[0].r,
    diffRY = maxYPoint.r - colors[0].r,
    diffGX = maxXPoint.g - colors[0].g,
    diffGY = maxYPoint.g - colors[0].g,
    diffBX = maxXPoint.b - colors[0].b,
    diffBY = maxYPoint.b - colors[0].b,
    diffAX = maxXPoint.a - colors[0].a,
    diffAY = maxYPoint.a - colors[0].a;

    let pctY = y / height,
    pctX = x / width;

    let r = colors[0].r + (diffRX * pctX) + (diffRY * pctY),
    g = colors[0].g + (diffGX * pctX) + (diffGY * pctY),
    b = colors[0].b + (diffBX * pctX) + (diffBY * pctY),
    a = colors[0].a + (diffAX * pctX) + (diffAY * pctY);

    return Color(r, g, b, a);
}