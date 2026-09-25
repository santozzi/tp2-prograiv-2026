import { beforeEach, describe, expect, it } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';
import { NewNote } from '../../src/models/Note';

describe('NoteService - getNote (Ejercicio 3)', () => {
  let service: NoteServiceImpl;
  let repo: SqliteNoteRepository;

  beforeEach(() => {
    const db = createDb(':memory:');
    repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('nota con id inexistente retorna undefined', () => {
    const note = service.getNote(100);

    expect(note).toBeUndefined();
  });

  it('nota con id existente la retorna correctamente', () => {
    const newNote: NewNote = { title: 'ABC', content: 'DEF' };
    service.createNote(newNote);

    const note = service.getNote(1);
    expect(note).toBeDefined();
    expect(note).toHaveProperty('title', newNote.title);
    expect(note).toHaveProperty('content', newNote.content);
    expect(note).toHaveProperty('pinned', false);
  });
});
