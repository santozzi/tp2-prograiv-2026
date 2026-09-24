import { beforeEach, describe, it, expect } from 'vitest';
import { createDb } from '../../src/db/connection';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { NewNote } from '../../src/models/Note';

describe('NoteService - listNotes (Ejercicio 2)', () => {
  let service: NoteServiceImpl;
  let repo: SqliteNoteRepository;
  const firstNote: NewNote = { title: 'A', content: 'B' };
  const secondNote: NewNote = { title: 'B', content: 'C' };

  beforeEach(() => {
    const db = createDb(':memory:');
    repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('inicializa con lista vacia', () => {
    const notes = service.listNotes();
    expect(notes).toHaveLength(0);
  });

  it('devuelve varias notas existentes', () => {
    service.createNote(firstNote);
    service.createNote(secondNote);
    const notes = service.listNotes();

    expect(notes).toHaveLength(2);
    expect(notes[0]).toHaveProperty('title', firstNote.title);
    expect(notes[1]).toHaveProperty('title', secondNote.title);
  });

  it('devuelve varias notas en orden', () => {
    service.createNote(firstNote);
    service.createNote(secondNote);
    const notes = service.listNotes();

    expect(notes[0]).toHaveProperty('id', 1);
    expect(notes[1]).toHaveProperty('id', 2);
  });

  it('devuelve notas con todas las propiedades', () => {
    service.createNote(firstNote);
    const notes = service.listNotes();

    expect(notes[0]).toHaveProperty('id');
    expect(notes[0]).toHaveProperty('title');
    expect(notes[0]).toHaveProperty('content');
    expect(notes[0]).toHaveProperty('pinned');
    expect(notes[0]).toHaveProperty('createdAt');
    expect(notes[0]).toHaveProperty('updatedAt');
  });
});
