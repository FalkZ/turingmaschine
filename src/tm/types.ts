import isEqual from "lodash.isequal";

export type State = number;
export type Sym = number; // string[1]

type Direction = "L" | "R";

export const DEFAULT_BAND_SYMBOL = 0;
export const DEFAULT_TM_STATE = 0;
export const DEFAULT_TM_ACCEPTED_STATE = 1;

export interface TransitionSource {
  currentQ: State;
  inputSymbol: Sym;
}
export interface TransitionTarget {
  nextQ: State;
  writeSymbol: Sym;
  direction: Direction;
}

export class TMError extends Error {
  #isBlocking: Boolean = false;

  constructor(message: string, isBlocking: Boolean) {
    super(message);
    this.#isBlocking = isBlocking;
  }

  get isBlocking() {
    return this.#isBlocking;
  }
}

export class ObjectMap<K, V> extends Map<K, V> {
  set(key: K, value: V): this {
    if (this.get(key)) {
      throw new TMError("Übergangsfunktionen sind nicht deterministisch", true);
    }

    super.set(key, value);
    return this;
  }
  get(obj) {
    return [...this.entries()].filter(([key, value]) =>
      isEqual(obj, key)
    )?.[0]?.[1];
  }
}
export type TransitionMap = ObjectMap<TransitionSource, TransitionTarget>;
