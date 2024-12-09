import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import NoteCard from './NoteCard';
import { Container, TextField, Grid, Fab, Typography, Button, Modal, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './NoteList.css';

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [note, setNote] = useState({
    title: '',
    date: '',
    description: '',
    tags: '',
    isPinned: false
  });
  const [currentNoteId, setCurrentNoteId] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'notes'), (snapshot) => {
      const notesData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setNotes(notesData);
    });

    return () => unsubscribe();
  }, []);

  const handleAddNote = async () => {
    try {
      await addDoc(collection(db, 'notes'), {
        ...note,
        tags: note.tags.split(',').map(tag => tag.trim())
      });
      setNote({ title: '', date: '', description: '', tags: '', isPinned: false });
      setOpen(false);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const handleEditNote = async () => {
    try {
      const noteRef = doc(db, 'notes', currentNoteId);
      await updateDoc(noteRef, {
        ...note,
        tags: note.tags.split(',').map(tag => tag.trim())
      });
      setNote({ title: '', date: '', description: '', tags: '', isPinned: false });
      setEditOpen(false);
      setCurrentNoteId(null);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteDoc(doc(db, 'notes', id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handlePinNote = async (id, isPinned) => {
    try {
      const noteRef = doc(db, 'notes', id);
      await updateDoc(noteRef, { isPinned: !isPinned });
    } catch (error) {
      console.error("Error pinning document:", error);
    }
  };

  const filteredNotes = notes.filter(note => {
    const titleMatches = note.title.toLowerCase().includes(search.toLowerCase());
    const tagsMatch = filterTag ? note.tags.includes(filterTag) : true;
    return titleMatches && tagsMatch;
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditOpen = (note) => {
    setNote(note);
    setCurrentNoteId(note.id);
    setEditOpen(true);
  };
  const handleEditClose = () => setEditOpen(false);

  return (
    <Container>
      <div className="search-bar-container">
        <TextField
          label="Search"
          fullWidth
          margin="normal"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Fab 
          color="primary" 
          aria-label="add" 
          className="add-note-button"
          onClick={handleOpen}>
          <AddIcon />
        </Fab>
        <TextField
          label="Filter by Tag"
          fullWidth
          margin="normal"
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
        />
      </div>
      <Grid container spacing={3} className="note-list">
        {filteredNotes.map(note => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <NoteCard
              title={note.title}
              date={note.date}
              description={note.description}
              tags={note.tags}
              isPinned={note.isPinned}
              onDelete={() => handleDeleteNote(note.id)}
              onEdit={() => handleEditOpen(note)}
              onPin={() => handlePinNote(note.id, note.isPinned)}
            />
          </Grid>
        ))}
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <Paper className="note-modal">
          <Typography variant="h6" gutterBottom>Add Note</Typography>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
          <TextField
            type="date"
            fullWidth
            margin="normal"
            value={note.date}
            onChange={(e) => setNote({ ...note, date: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={note.description}
            onChange={(e) => setNote({ ...note, description: e.target.value })}
          />
          <TextField
            label="Tags (comma separated)"
            fullWidth
            margin="normal"
            value={note.tags}
            onChange={(e) => setNote({ ...note, tags: e.target.value })}
          />
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={handleAddNote}
            style={{ marginTop: 16 }}>
            Add Note
          </Button>
        </Paper>
      </Modal>
      <Modal open={editOpen} onClose={handleEditClose}>
        <Paper className="note-modal">
          <Typography variant="h6" gutterBottom>Edit Note</Typography>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
          <TextField
            type="date"
            fullWidth
            margin="normal"
            value={note.date}
            onChange={(e) => setNote({ ...note, date: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={note.description}
            onChange={(e) => setNote({ ...note, description: e.target.value })}
          />
          <TextField
            label="Tags (comma separated)"
            fullWidth
            margin="normal"
            value={note.tags}
            onChange={(e) => setNote({ ...note, tags: e.target.value })}
          />
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={handleEditNote}
            style={{ marginTop: 16 }}>
            Save Changes
          </Button>
        </Paper>
      </Modal>
    </Container>
  );
}

export default NoteList;
