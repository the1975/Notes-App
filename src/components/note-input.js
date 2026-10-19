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

    // Validasi Realtime
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
        
        // HANYA MENGIRIM TITLE DAN BODY KE API
        const newNote = {
          title: titleInput.value,
          body: bodyInput.value,
        };

        this.dispatchEvent(new CustomEvent('note-added', {
          detail: newNote,
          bubbles: true
        }));

        form.reset();
      }
    });
  }
}
customElements.define('note-input', NoteInput);