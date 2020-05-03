import {
  TransitionMap,
  TransitionSource,
  TransitionTarget,
  State,
  DEFAULT_TM_STATE,
  DEFAULT_TM_ACCEPTED_STATE
} from "./types";

import { Band } from "./Band";
import { parseTM, decodeInput, encodeTM } from "./coder";

export class UniversalTM {
  #band: Band = new Band();
  #transitions: TransitionMap;
  #initialDecodedInput: number[];

  #acceptedQ: State;
  #currentQ: State = DEFAULT_TM_STATE;

  constructor(
    serializedTM: string,
    acceptedState?: State = DEFAULT_TM_ACCEPTED_STATE
  ) {
    const [tm, input] = serializedTM.split("111");

    this.#acceptedQ = acceptedState;
    this.#transitions = parseTM(tm);
    console.log("Transitions:", this.#transitions);
    this.#initialDecodedInput = decodeInput(input);
    this.#band.init(this.#initialDecodedInput);
  }

  decodedTM(): string {
    return [...this.#transitions.entries()].map(([source, target]) =>
      `Q${source.currentQ}, ${source.inputSymbol}, Q${target.nextQ}, ${target.writeSymbol}, ${target.direction}`
    ).join("\n");
  }

  decodeInput(): string {
    return this.#initialDecodedInput.join("");
  }

  step() {
    console.count("Steps");
    const transitionSource: TransitionSource = {
      currentQ: this.#currentQ,
      inputSymbol: this.#band.getSymbol()
    };
    console.log("source", transitionSource);

    const transitionTarget: TransitionTarget = this.#transitions.get(
      transitionSource
    );
    console.log("target", transitionTarget);

    if (!transitionTarget) {
      throw new Error("is stuck");
    }

    // execute step
    if (transitionTarget.direction === "L") {
      this.#band.moveLeft(transitionTarget.writeSymbol);
    } else this.#band.moveRight(transitionTarget.writeSymbol);

    this.#currentQ = transitionTarget.nextQ;
  }

  isFinished(): boolean {
    return this.#currentQ === this.#acceptedQ;
  }

  get state() {
    return this.#currentQ;
  }

  get band() {
    return this.#band;
  }
}

// #######################################################################
// Main
/*
const input = `
Q0, 0, Q0, 0, R
Q1, 0, Q1, 0, R
Q0, 1, Q1, 1, R
Q1, 1, Q0, 1, R
Q0, _, Q2, 0, R
Q1, _, Q2, 1, R
`;

const example = encodeTM(input) + "111" + "01010100";
const example2 = encodeTM(input) + "111" + "001010010100100";

const universalTM = new UniversalTM(example2, 3);

while (!universalTM.isFinished()) {
  console.log("transition state", {
    state: universalTM.state,
    currentSymbol: universalTM.band.getSymbol()
  });
  console.log("symbols: ", universalTM.band.getSymbols());
  universalTM.step();
  console.log();
}

console.log("result: ");
console.log("symbols: ", universalTM.band.getSymbols());
*/
