import React, { useState, useEffect } from 'react';
import './App.css';
import NoteList from './NoteList';
import NoteEditor from './NoteEditor';

function saveNotesToLocalStorage(notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotesFromLocalStorage() {
  const storedNotes = localStorage.getItem('notes');
  if (storedNotes) {
    const parsedNotes = JSON.parse(storedNotes);
    if (Array.isArray(parsedNotes) && parsedNotes.length > 0) {
      return parsedNotes;
    }
  }
  const defaultNote = { title: 'Обычная заметка', description: 'Привет, мир!' };
  saveNotesToLocalStorage([defaultNote]);
  return [defaultNote];
}

function App() {
  const [notes, setNotes] = useState(loadNotesFromLocalStorage());
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    saveNotesToLocalStorage(notes);
  }, [notes]);

  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  const editNote = (editedNote, index) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = editedNote;
    setNotes(updatedNotes);
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    if (selectedNote === index) {
      setSelectedNote(null);
    }
  };

  const handleNoteClick = (index) => {
    setSelectedNote(index);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>MyNotes</h1>
        <img src="/logo.png" alt="Your Logo" />
      </header>

      <div className="note-container">
        <NoteList
          notes={notes}
          onNoteClick={handleNoteClick}
          selectedNote={selectedNote}
          deleteNote={deleteNote}
        />
        <div className="divider"></div>
        <NoteEditor
          note={selectedNote !== null ? notes[selectedNote] : {}}
          addNote={addNote}
          editNote={editNote}
          deleteNote={deleteNote}
          selectedNote={selectedNote}
        />
      </div>

      <footer className="footer">
        <p>&copy; 2023 MyNotes</p>
        <p>Website: <a href="#">https:MyNotes.com</a></p>
      </footer>
    </div>
  );
}

export default App;