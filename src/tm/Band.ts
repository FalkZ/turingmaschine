import { Sym, DEFAULT_BAND_SYMBOL } from "./types";

class BandEntry {
  #previous: BandEntry = null;
  #next: BandEntry;
  #symbol: Sym;
  constructor({
    previous,
    next
  }: {
    previous?: BandEntry;
    next?: BandEntry;
  } = {}) {
    this.#previous = previous;
    this.#next = next;
    this.#symbol = DEFAULT_BAND_SYMBOL;
  }
  getSymbols() {
    const symbols = [this.#symbol];
    let current: BandEntry = this;
    for (let index = 0; index < 15; index++) {
      current = current.#previous || new BandEntry();
      symbols.unshift(current.symbol);
    }
    current = this;
    for (let index = 0; index < 15; index++) {
      current = current.#next || new BandEntry();
      symbols.push(current.symbol);
    }
    return symbols;
  }
  L(symbol) {
    this.#symbol = symbol;
    if (!this.#previous) this.#previous = new BandEntry({ next: this });
    return this.#previous;
  }
  R(symbol) {
    this.#symbol = symbol;
    if (!this.#next) this.#next = new BandEntry({ previous: this });
    return this.#next;
  }
  get symbol() {
    return this.#symbol;
  }
}

export class Band {
  #currentEntry = new BandEntry();
  getSymbol() {
    return this.#currentEntry.symbol;
  }
  moveLeft(symbol) {
    this.#currentEntry = this.#currentEntry.L(symbol);
  }
  moveRight(symbol) {
    this.#currentEntry = this.#currentEntry.R(symbol);
  }
  init(input: Sym[]) {
    [...input].reverse().forEach((sym) => this.moveLeft(sym));
    this.moveRight(this.getSymbol());
  }
  getSymbols() {
    return this.#currentEntry.getSymbols();
  }
}
