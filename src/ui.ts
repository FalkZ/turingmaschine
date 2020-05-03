import { LitElement, html, property, customElement } from "lit-element";
import { store } from "./Store";
import {
  onChangeDecodedTM,
  onChangeEncodedTM,
  onChangeDecodedInput,
  run,
  step
} from "./controller";

export const ui = document.createElement("ui-main");

document.body.appendChild(ui);

@customElement("ui-band")
export class UIBand extends LitElement {
  @property({ type: Array })
  band: number[] = [];
  // @property()
  // name = "World";

  render() {
    return html `<div>

      ${(this.band).map((str, index) =>
      html `<div class="band-item" id=${index === 15
        ? "active"
        : ""}>${str}</div>`
    )}
    </div>
    `;
  }
}

@customElement("ui-main")
export class UIMain extends LitElement {
  render() {
    const isFinished = false; // store.TM.isFinished();

    return html `<div>
      <label>Übergangsfunktionen</label>
      <textarea id="decodedTM" .value=${store.decodedTM} @change=${onChangeDecodedTM}></textarea>

      <label>Übergangsfunktionen Codiert</label>
      <input id="encodedTM"  value=${store.encodedTM}  @change=${onChangeEncodedTM} ></input>

<label>Input</label>
      <input id="decodedInput" value=${store.input} @change=${({ target }) =>
      onChangeDecodedInput(target.value)} ></input>

      <button .disabled=${isFinished} @click=${run}>Run</button>
      <button .disabled=${isFinished} @click=${step}>Schritt</button>
      <ui-band .band=${store.TM.band.getSymbols()}></ui-band>
      </div>`;
  }
}

// SET EXAMPLE
