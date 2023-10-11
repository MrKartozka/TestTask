import React from 'react';
import './NoteList.css';

function NoteList({ notes, onNoteClick, selectedNote }) {
  const handleCreateNote = () => {
    onNoteClick(null);
  };

  return (
    <div className="note-list">
      <h2>Заметки</h2>
      <ul>
        {notes.map((note, index) => (
          <li
            key={index}
            className={`note-item ${selectedNote === index ? 'selected' : ''}`}
            onClick={() => onNoteClick(index)}
          >
            <span className="note-title">{note.title}</span>
          </li>
        ))}
      </ul>
      <div className="create-note" onClick={handleCreateNote}>
        1.Создать новую заметку
      </div>
    </div>
  );
}

export default NoteList;