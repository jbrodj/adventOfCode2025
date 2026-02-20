// ==== Advent of Code problem 14 ====

// Instead of a tachyon splitting at each splitter, now we only move left or right -- only a single tachyon can be 
// in the manifold at a time. 
// So at each splitter, the tachyon either moves left or right to the line below.
// Except for this problem, we are assuming that in every case, one possible timeline sees the tachyon move left,
// and in the other we see it move right.
// The problem is to discover the total number of "timelines" we encounter from the possible permutations of a single tachyon
// moving through the manifold.
// So we need to be able to run our tachyon movement function anew each time we hit a splitter
// Or come up with a model that allows us to track the possible permutations at each step
// This might be simpler... Each time we hit a splitter, we're adding another permutation. 
// If we ran our logic from part 1, we might miss some permutations due to combining split tachyons that happen to occupy
// the same space after a split. So if we eliminate that part of the logic (simply allow each tachyon in our data set to occupy
// identical positions), we'd end up with a number of tachyons at the end that should match the number of permutations. 
// We need to track the positions of each tachyon using a data structure, rather than modifying the manifold array
