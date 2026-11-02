import { beforeEach, describe, expect, it } from 'vitest';
import { createDb } from '../../src/db/connection';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { NewNote } from '../../src/models/Note';

describe('NoteService - Get By Id', () => {
  let service: NoteServiceImpl;

  beforeEach(() => {
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('obtener una nota inexistente retorna undefined', () => {
    expect(service.getNote(999)).toBeUndefined();
  });

  it('retorna correctamente una nota recien creada', () => {
    const newNote: NewNote = { title: 'A', content: 'B' };
    const createdNote = service.createNote(newNote);

    expect(service.getNote(createdNote.id)).toBeDefined();
    expect(service.getNote(createdNote.id)?.title).toEqual(newNote.title);
    expect(service.getNote(createdNote.id)?.content).toEqual(newNote.content);
    expect(service.getNote(createdNote.id)?.createdAt).toBeDefined();
    expect(service.getNote(createdNote.id)?.updatedAt).toBeDefined();
  });
});
