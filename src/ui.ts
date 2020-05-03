import { LitElement, html, property, customElement } from "lit-element";

@customElement("ui-main")
export class UIMain extends LitElement {
  render() {
    return html`<input @change=${console.log}></input>`;
  }
}
