import { notesData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const notesContainer = document.getElementById('notes-list-container');
  
  // Fungsi untuk render daftar catatan (Kriteria Wajib 1)
  const renderNotes = (notes) => {
    notesContainer.innerHTML = '';
    notes.forEach(note => {
      const noteElement = document.createElement('note-item');
      noteElement.note = note; // Mengirim data ke custom element
      notesContainer.appendChild(noteElement);
    });
  };

  // Render awal data dummy
  renderNotes(notesData);

  // Mendengarkan event 'note-added' dari komponen form input
  document.addEventListener('note-added', (e) => {
    const newNote = e.detail;
    notesData.unshift(newNote); // Tambahkan ke array di bagian awal
    renderNotes(notesData);     // Render ulang daftar catatan
  });
});
