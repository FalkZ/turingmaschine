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

export const ui = document.createElement("ui-main");

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
          background: #77f;
        }
      </style>
      <div>
        ${this.band.map(
          (str, index) =>
            html`<div class="band-item" id=${index === 15 ? "active" : ""}>
              ${str}
            </div>`
        )}
      </div>
    `;
  }
}

@customElement("ui-main")
export class UIMain extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    const isFinished = store.TM.isFinished();

    return html`<div class="panel">
      <h1>Universelle Turingmaschine</h1>
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
      <div class="panel blue">
      <label>Band</label>
      <ui-band .band=${store.TM.band.getSymbols()}></ui-band>

      <label>Aktueller Status Q${store.TM.state}</label>

      <button .disabled=${isFinished} @click=${run}>Run</button>
      <button .disabled=${isFinished} @click=${step}>Schritt</button>
      <button class="secondary"  @click=${reset}>Reset</button>
      </div>
      `;
  }
}
