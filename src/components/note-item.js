class NoteItem extends HTMLElement {
  set note(data) {
    this.innerHTML = `
      <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display: flex; flex-direction: column; height: 100%;">
        <h3 style="margin-bottom: 8px;">${data.title}</h3>
        <p style="color: #4b5563; font-size: 14px; margin-bottom: 15px; flex-grow: 1;">${data.body}</p>
        <button class="delete-btn" style="background: #ef4444;">Hapus</button>
      </div>
    `;

    this.querySelector('.delete-btn').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('delete-note', { detail: data.id, bubbles: true }));
    });
  }
}
customElements.define('note-item', NoteItem);