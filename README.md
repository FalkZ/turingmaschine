[Turingmachine Simulator](https://turingmaschine.netlify.app/)

This Webapp encodes a human readable format of a turning machine e.g.:
```
Q0, 0, Q1, 1, R   // If in state Q0, and 0 read from the band, goto state Q1, write 1 to the mand, move head to the right
```

Then runs the encoded machine ether step by step or until end state Q1 is reached. The simulator also shows a visualization of all the states. The demo shows an binary multiplication implmented as a turing machine.
