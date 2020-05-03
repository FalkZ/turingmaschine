import {
  Sym,
  TransitionMap,
  ObjectMap,
  TransitionSource,
  TransitionTarget
} from "./types";

export const parseTM = (turingMachine: string): TransitionMap =>
  new ObjectMap(
    turingMachine
      .split("11")
      .map((fn) => fn.split("1").map((zeros): number => zeros.length))
      .map(([currentQ, inputSymbol, nextQ, writeSymbol, direction]): [
        TransitionSource,
        TransitionTarget
      ] =>
        [
          {
            currentQ,
            inputSymbol
          },
          { nextQ, writeSymbol, direction: direction === 1 ? "L" : "R" }
        ]
      )
  );
// decode input
export const decodeInput = (input: string): Sym[] => {
  if(!input.includes("1"))
    return [];
  return input.split("1").map((zeros): number => zeros.length);
};

export const encodeTM = (str: string): string => {
  const fns = [];
  const ret = str
    .trim()
    .split("\n")
    .map((str) => str.trim())
    .map((str) => str.split(",").map((v) => v.trim()))
    .map(([currentQ, inputSymbol, nextQ, writeSymbol, direction]) => {
      fns.push({ currentQ, inputSymbol, nextQ, writeSymbol, direction });
      return [
        parseInt(currentQ.substring(1)) + 1,
        parseInt(inputSymbol) + 1 || 3,
        parseInt(nextQ.substring(1)) + 1,
        parseInt(writeSymbol) + 1,
        direction === "L" ? 1 : 2
      ]
        .map((nr) => "0".repeat(nr))
        .join("1");
    })
    .join("11");

  return ret;
};

export const encodeInput = (str: string): string => {
  return str.split("").map(symbol => parseInt(symbol)+1)
  .map((nr) => "0".repeat(nr))
  .join("1");
  })
}