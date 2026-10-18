class AppBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1>Catatanku</h1>`;
  }
}
customElements.define('app-bar', AppBar);
