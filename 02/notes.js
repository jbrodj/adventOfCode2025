// ==== Advent of Code problem 2 ====

// Instead of counting the instances where the dial points at zero at the end of an instruction, 
// we now also want to count those instances where a dial would point to zero during an instruction.
// Ie. dial position 50, instruction R1000 would cause multiple zero position counts

// To accomplish this, we could add logic that subtracts the current position of the dial 
// from each instruction (if the instruction is great enough to push us to zero from one
// direction or the other). 
// For ex:
// For a R turn, the instruction has to be >= 100 - the current dial position to reach zero
// For a L turn, the unstruction has to be >= the current dial position to reach zero. 

// While instruction integer is negative, and integer is <= -100, add 100 to integer, and ++ zero count, then
// While instruction integer is negative, and integer is >100, and absolute value of int >= current dial position, add integer to dial position and ++ zero count

// While instruction integer is positive, and integer is >= 100, subtract 100 from integer, and ++ zero count, then
// While instruction integer is positive, and integer is <100, and value of int >= current dial position, add integer to dial position and ++ zero count. 
// Both above --> Accounting for times when the dial ends on zero -- this means we can eliminate the original zero counting function.

// Possibly using a new var of absolute value of the instruction integer for the loop, to avoid needing to duplicate the logic for pos/neg values. 
