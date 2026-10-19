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
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 6px 12px rgba(11, 59, 96, 0.05);
          display: flex;
          flex-direction: column;
          height: 100%;
          border-left: 5px solid #64b5f6;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(11, 59, 96, 0.1);
        }
        .card h3 { 
          margin-bottom: 12px; 
          font-size: 1.3em; 
          color: #0b3b60; 
        }
        .card p { 
          flex-grow: 1; 
          margin-bottom: 20px; 
          line-height: 1.6; 
          color: #455a64; 
        }
        .card small { 
          color: #78909c; 
          font-size: 0.85em; 
          font-weight: 500;
        }
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

class NoteItem extends HTMLElement {
  set note(noteData) {
    this._note = noteData;
    this.render();
  }

  render() {
    const date = new Date(this._note.createdAt).toLocaleDateString('id-ID', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    this.innerHTML = `
      <style>
        /* (Gunakan CSS premium yang sudah kita buat sebelumnya di sini) */
        .card { ... }
        .btn-delete {
          background-color: transparent !important;
          color: #EF4444 !important;
          border: 1px solid #EF4444 !important;
          padding: 8px 16px !important;
          margin-top: 16px;
        }
        .btn-delete:hover {
          background-color: #FEE2E2 !important;
        }
      </style>
      <div class="card">
        <h3>${this._note.title}</h3>
        <p>${this._note.body}</p>
        <small>${date}</small>
        <button class="btn-delete" data-id="${this._note.id}">Hapus Catatan</button>
      </div>
    `;

    this.querySelector('.btn-delete').addEventListener('click', () => {
      // Mengirim event ke main.js beserta ID catatan
      this.dispatchEvent(new CustomEvent('delete-note', {
        detail: this._note.id,
        bubbles: true
      }));
    });
  }
}
customElements.define('note-item', NoteItem);
