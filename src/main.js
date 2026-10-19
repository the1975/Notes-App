import './style.css'; // Wajib ada agar CSS dibundel oleh Webpack
import './components/app-bar.js';
import './components/note-input.js';
import './components/note-item.js';
import './components/loading-indicator.js';
import NotesApi from './js/api.js';
import Swal from 'sweetalert2';

document.addEventListener('DOMContentLoaded', () => {
  const notesContainer = document.getElementById('notes-list-container');
  const loadingIndicator = document.getElementById('loading');

  const showLoading = () => loadingIndicator.style.display = 'block';
  const hideLoading = () => loadingIndicator.style.display = 'none';

  const showError = (message) => {
    Swal.fire({ icon: 'error', title: 'Oops...', text: message, confirmButtonColor: '#111827' });
  };

  const renderNotes = async () => {
    try {
      showLoading();
      const notes = await NotesApi.getNotes();
      notesContainer.innerHTML = '';
      notes.forEach(note => {
        const noteElement = document.createElement('note-item');
        noteElement.note = note;
        notesContainer.appendChild(noteElement);
      });
    } catch (error) {
      showError('Gagal mengambil data catatan dari server.');
    } finally {
      hideLoading();
    }
  };

  // Event Listener: Tambah Catatan
  document.addEventListener('note-added', async (e) => {
    const { title, body } = e.detail;
    try {
      showLoading();
      await NotesApi.createNote(title, body);
      Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Catatan ditambahkan!', timer: 1500, showConfirmButton: false });
      renderNotes(); // Refresh daftar catatan
    } catch (error) {
      showError('Gagal menambahkan catatan.');
    } finally {
      hideLoading();
    }
  });

  // Event Listener: Hapus Catatan
  document.addEventListener('delete-note', async (e) => {
    const noteId = e.detail;
    const result = await Swal.fire({
      title: 'Hapus catatan?',
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Ya, hapus!'
    });

    if (result.isConfirmed) {
      try {
        showLoading();
        await NotesApi.deleteNote(noteId);
        Swal.fire({ icon: 'success', title: 'Terhapus!', text: 'Catatan telah dihapus.', timer: 1500, showConfirmButton: false });
        renderNotes(); // Refresh daftar catatan
      } catch (error) {
        showError('Gagal menghapus catatan.');
      } finally {
        hideLoading();
      }
    }
  });

  // Render pertama kali saat aplikasi dibuka
  renderNotes();
});
