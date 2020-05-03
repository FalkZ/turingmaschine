import {
  TransitionMap,
  TransitionSource,
  TransitionTarget,
  State,
  DEFAULT_TM_STATE,
  DEFAULT_TM_ACCEPTED_STATE
} from "./types";

import { Band } from "./Band";
import { parseTM, decodeTM, decodeInput, encodeTM } from "./coder";

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

  decodedTM(): string {
    return decodeTM(this.#transitions);
  }

  decodedInput(): string {
    return this.#initialDecodedInput.join("");
  }
}
