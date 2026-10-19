const BASE_URL = 'https://notes-api.dicoding.dev/v2';

class NotesApi {
  static async getNotes() {
    const response = await fetch(`${BASE_URL}/notes`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data;
  }

  static async createNote(title, body) {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data;
  }

  static async deleteNote(id) {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.message;
  }
}

export default NotesApi;
