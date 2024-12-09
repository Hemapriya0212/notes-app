import React from 'react';
import { FaTrash, FaEdit, FaThumbtack } from 'react-icons/fa';
import { Paper, Typography, IconButton, Chip } from '@mui/material';
import './NoteCard.css';

function NoteCard({ title, date, description, tags, onDelete, onEdit, onPin, isPinned }) {
  return (
    <Paper elevation={3} className={`note-card ${isPinned ? 'pinned' : ''}`}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="subtitle2">{date}</Typography>
      <Typography variant="body1">{description}</Typography>
      <div className="tags">
        {tags.map((tag, index) => (
          <Chip key={index} label={tag} className="tag" />
        ))}
      </div>
      <div className="actions">
        <IconButton onClick={onPin} color={isPinned ? 'primary' : 'default'}>
          <FaThumbtack />
        </IconButton>
        <IconButton onClick={onEdit} color="primary">
          <FaEdit />
        </IconButton>
        <IconButton onClick={onDelete} color="secondary">
          <FaTrash />
        </IconButton>
      </div>
    </Paper>
  );
}

export default NoteCard;
