import React, { useState, useEffect } from 'react';
import './NoteEditor.css';

function NoteEditor({ note, addNote, editNote, selectedNote, deleteNote }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedNote !== null) {
      setTitle(note.title);
      setDescription(note.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [selectedNote, note]);

  const handleAddNote = () => {
    if (title.trim() === '') return;
    addNote({ title, description });
    setTitle('');
    setDescription('');
  };

  const handleEditNote = () => {
    if (title.trim() === '' || description.trim() === '') return;
    editNote(
      {
        title,
        description,
      },
      selectedNote
    );
  };

  const handleDeleteNote = () => {
    deleteNote(selectedNote);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="note-editor">
      <h2>Описание</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Заголовок"
        className="note-title centered-title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Описание"
        className="note-description"
      />
      <button onClick={handleEditNote} className="edit-note-button">
        Сохранить
      </button>
      {selectedNote !== null && (
        <button onClick={handleDeleteNote} className="delete-button">
          Удалить
        </button>
      )}
      {selectedNote === null && (
        <button onClick={handleAddNote}>2.Создать</button>
      )}
    </div>
  );
}

export default NoteEditor;