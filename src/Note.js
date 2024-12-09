import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import './Note.css';

function Note() {
  const [note, setNote] = useState({
    title: '',
    date: '',
    description: '',
    tags: ''
  });

  const handleAddNote = async () => {
    console.log("Attempting to add note:", note); // Log the note being added
    try {
      await addDoc(collection(db, 'notes'), {
        title: note.title,
        date: note.date,
        description: note.description,
        tags: note.tags.split(',').map(tag => tag.trim())
      });
      console.log("Note added successfully"); // Log success message
      setNote({ title: '', date: '', description: '', tags: '' }); // Clear form fields after adding note
      alert('Note added successfully!');
    } catch (error) {
      console.error("Error adding document:", error); // Log the error message
    }
  };

  return (
    <div className="note-container">
      <h2>Add Note</h2>
      <input
        type="text"
        placeholder="Title"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
      />
      <input
        type="date"
        placeholder="Date"
        value={note.date}
        onChange={(e) => setNote({ ...note, date: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={note.description}
        onChange={(e) => setNote({ ...note, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={note.tags}
        onChange={(e) => setNote({ ...note, tags: e.target.value })}
      />
      <button onClick={handleAddNote}>Add Note</button>
    </div>
  );
}

export default Note;
