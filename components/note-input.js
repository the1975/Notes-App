class NoteInput extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupValidationAndSubmit();
  }

  render() {
    this.innerHTML = `
      <form id="add-note-form">
        <div class="form-group">
          <input type="text" id="note-title" placeholder="Judul Catatan" required autocomplete="off">
          <span id="title-error" class="error-message"></span>
        </div>
        <div class="form-group">
          <textarea id="note-body" placeholder="Isi Catatan" required></textarea>
          <span id="body-error" class="error-message"></span>
        </div>
        <button type="submit" id="submit-btn">Tambah Catatan</button>
      </form>
    `;
  }

  setupValidationAndSubmit() {
    const form = this.querySelector('#add-note-form');
    const titleInput = this.querySelector('#note-title');
    const bodyInput = this.querySelector('#note-body');
    const titleError = this.querySelector('#title-error');
    const bodyError = this.querySelector('#body-error');

    // Realtime Validation (Kriteria Opsional 2)
    titleInput.addEventListener('input', () => {
      if (titleInput.value.length < 3) {
        titleError.innerText = 'Judul minimal harus 3 karakter.';
      } else {
        titleError.innerText = '';
      }
    });

    bodyInput.addEventListener('input', () => {
      if (bodyInput.value.length < 5) {
        bodyError.innerText = 'Isi catatan minimal harus 5 karakter.';
      } else {
        bodyError.innerText = '';
      }
    });

    // Form Submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (titleInput.value.length >= 3 && bodyInput.value.length >= 5) {
        const newNote = {
          id: `notes-${Math.random().toString(36).substr(2, 9)}`,
          title: titleInput.value,
          body: bodyInput.value,
          createdAt: new Date().toISOString(),
          archived: false,
        };

        // Mengirim custom event agar main.js bisa menangkap data baru
        this.dispatchEvent(new CustomEvent('note-added', {
          detail: newNote,
          bubbles: true
        }));

        form.reset(); // Kosongkan form setelah submit
      }
    });
  }
}
customElements.define('note-input', NoteInput);
