// ==== Advent of Code problem 17 ====

// A floor has some number of red tiles and the rest of other colours
// We wish to find, given a pattern of floor tiles, what is the largest possible rectangle we can transcribe with two
// opposite corners being red tiles.
// The input is a line-separated list of x-y coordinates given as integers
// We can calculate the sizes of the rectangles by finding the x and y distances between a given red tile and each other red tile
// adding one to the result to account for the space taken up by the lower numbered tile itself
// -- muiltiplying them gives us the area of the rectangle.
// We can loop over our input to find and store the coordinates of each red tile in an array
// Then nested loop over our red tiles, calculating the size of the rectangle transcribed by the current tile and each other tile
// -- reducing the size of the inner loop each time because we've already calculated 
// We can track the largest area so far and replace that value if we find a larger one, returning the largest area at the end
