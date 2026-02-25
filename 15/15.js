// ==== Advent of Code problem 15 ====

// Given a set of n 3d coordinates of electrical junction boxes
// When two junction boxes are connected by a string of lights, electricity can flow between them, creating a circuit
// A circuit can contain two or more junction boxes (ie. we can create connections from one junction box to multiple others)
// We want to create connections using the shortest possible straight-line distances
// We need to connect the 1000 pairs of junction boxes that are closest together
// Then multiply the sizes (num of junctions in circuit) of the three largest circuits. 

// Beyond splitting our txt input by line, it probably makes sense to split it again into a 2d array of coordinates to make each coordinate axis
// easily accessible by index. 
// So we need an algorithm for calculating the straight-line distance between two given junction boxes.
  // We have access to three coordinates for each -- we can use these to find the difference on each axis
  // We can use these distances to find the hypotenuse length of a right triangle that connects two of the three points
  // then use that hypotenuse length and the third distance to find the length between the two junctions
  // ie, let's say we have a junction at 0, 0, 0, and another 2, 3, 5 -- the distances are x = 3, y = 4, z = 5
  // So we can find the xy hypotenuse length --  sqrt (3^2 + 4^2) == 5
  // And then find the hypz hypotenuse length -- sqrt (5^5 + 5^5) == ~7.1
// So we can loop thru n and find the shortest distance for each junction box (actually we might need to find all distances for each junction box -- in the event a junction's second closest
// connection would be among the top x shortest connections and would connect its circuit to another circuit).
// We need a data structure to store our existing circuits -- when we find the shortest distance, add that junction box coordinate set to a sub-array of junction boxes that comprise a circuit
  // For any given junction box, once we've found the shortest distance to another junction box, there are a number of possibilities
    // a) Neither of the two junction box coordinates are in any existing circuits     --> in which case we simply wish to create a new circuit array, and add both coordinates
    // b) One of the two junction boxes is already in a circuit, but the other is not  --> in which case, we wish to add the second junction box to the circuit array that already contains the first
    // c) Both of the two junction boxes are already in a single cirtuit               --> in which case, we wish to do nothing
    // d) Both of the two junction boxes are already in SEPARATE circuits              --> in which case, it makes sense to merge the two circuit arrays
// We may come across a junction in our loop that is already part of a circuit, so we can skip it
// This loop may become complex quickly, because we have a nested loop both of which are looping over n, so we should take care to make the operations efficient.
