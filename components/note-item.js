class NoteItem extends HTMLElement {
  set note(noteData) {
    this._note = noteData;
    this.render();
  }

  render() {
    // Menggunakan setter/property untuk mengirim data kompleks
    const date = new Date(this._note.createdAt).toLocaleDateString('id-ID', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    this.innerHTML = `
      <style>
        .card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .card h3 { margin-bottom: 8px; font-size: 1.2em; color: #2c3e50; }
        .card p { flex-grow: 1; margin-bottom: 16px; line-height: 1.5; color: #555; }
        .card small { color: #888; font-size: 0.85em; }
      </style>
      <div class="card">
        <h3>${this._note.title}</h3>
        <p>${this._note.body}</p>
        <small>${date}</small>
      </div>
    `;
  }
}
customElements.define('note-item', NoteItem);
