import { LitElement, html, property, customElement } from "lit-element";
import { store } from "./Store";
import {
  onChangeDecodedTM,
  onChangeEncodedTM,
  onChangeDecodedInput,
  run,
  step,
  reset,
} from "./controller";

import { DEFAULT_BAND_SYMBOL } from "./tm/types";
import "./plantUML";

export const ui: LitElement = document.createElement("ui-main");

document.body.appendChild(ui);

const countLines = (v) => v.split("\n").length;

const autoResize = ({ target }) => {
  target.rows = countLines(target.value);
};

@customElement("ui-band")
export class UIBand extends LitElement {
  @property({ type: Array })
  band: number[] = [];
  // @property()
  // name = "World";

  render() {
    return html`
      <style>
        .band-item {
          display: inline-block;
          width: 30px;
          height: 30px;
          background: #ccccdd77;
          margin: 2px;
          text-align: center;
        }
        #active {
          margin-top: 0;
          font-weight: bold;
          background: #66f;
        }
      </style>
      <div>
        ${this.band.map(
          (nr, index) =>
            html`<div class="band-item" id=${index === 15 ? "active" : ""}>
              ${nr === DEFAULT_BAND_SYMBOL ? "_" : nr}
            </div>`
        )}
      </div>
    `;
  }
}

const errorMessage = () =>
  store.error
    ? html`<div class="panel red">
        Fehler: ${store.error.message}
      </div>`
    : "";

@customElement("ui-main")
export class UIMain extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    const isFinished = Boolean(
      store.TM.isFinished() || (store.error && store.error.isBlocking)
    );

    return html`<div class="panel">
      <h1>Deterministische Turingmaschine</h1>
      <h2>von Moritz Waser & Falk Zwimpfer</h2>

      <p>
        Startzustand: Q0<br>
        Akzeptierender Zustand: Q1<br>
        Leerzeichen des Bandes: 2 oder _
    </p>

    <div class="flex">
      <div class="col">
      <label>Übergangsfunktionen</label>
      <textarea id="decodedTM" .value=${store.decodedTM} rows=${countLines(
      store.decodedTM
    )} @change=${onChangeDecodedTM} @input=${autoResize} ></textarea>
      </div>
      <div class="col">
      <label>Input</label>
      <input id="decodedInput" value=${store.input} @change=${({ target }) =>
      onChangeDecodedInput(target.value)} ></input>

      <label>Input & Übergangsfunktionen Codiert</label>
      <input id="encodedTM"  value=${
        store.encodedTM
      }  @change=${onChangeEncodedTM} ></input>
      </div>
      </div>
      
      </div>
      ${errorMessage()}
      <div class="panel blue">
      <label>Band</label>
      <ui-band .band=${store.TM.band.getSymbols()}></ui-band>

      <label>Aktueller Status: <span> Q${store.TM.state} </span></label>
      <label>Anzahl Berechnungsschritte: <span>${
        store.TM.iterationCount
      }</span></label>

      <button .disabled=${isFinished} @click=${run}>Run</button>
      <button .disabled=${isFinished} @click=${step}>Schritt</button>
      <button class="secondary"  @click=${reset}>Reset</button>
      </div>
    
      <div class="panel blue">
      <ui-diagram .transitions=${store.TM.transitions} .currentState=${
      store.TM.state
    }></ui-diagram>
      </div>
      `;
  }
}
