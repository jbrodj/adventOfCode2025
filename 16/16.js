// ==== Advent of Code problem 16 ====

// Now instead of capping the num of shortest connections at a specific number, we wish to continue creating connections
// until all junction boxes are connected into a single circuit. 
// To discover this, we can check the length of the circuits array and return when we have a length of 1,
// then check if the num of junctions in a circuit === num of total junctions in our input.
// Then we need the x coordinate of each of the last two junction boxes that we connected, and multiply them together. 
// This should be straightforward to implement -- but I think the implementation from the prev problem will be too slow here.
// We'll want to streamline some operations to speed up. 
