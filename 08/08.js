// ==== Advent of Code problem 8 ====

// Now we want to account for removing a roll of paper -- once a roll is removed, other adjacent roll may be 
// possible to remove. 
// So we want to update the value of the char from '@' to '.' to represent the vacated space. 
// This also means we will need to re-check values for which an ajacent roll was removed.
// This could be done by repeating the whole outer loop if a roll was removed during the past loop (until 
// we run a loop without removing a roll). But this would probably be slow. 
// Could use a do/while loop for the above.
// We could also conditionally (ie. each time we are removing a roll), re-check the indecies that are directly
// adjacent to the removed index. 

// let inputArray = [
// '..@@.@@@@.',
// '@@@.@.@.@@',
// '@@@@@.@.@@',
// '@.@@@@..@.',
// '@@.@@@@.@@',
// '.@@@@@@@.@',
// '.@.@.@.@@@',
// '@.@@@.@@@@',
// '.@@@@@@@@.',
// '@.@.@@@.@.'
// ]
