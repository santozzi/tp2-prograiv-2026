import { beforeEach, describe, expect, it } from 'vitest';
import { createDb } from '../../src/db/connection';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { NewNote } from '../../src/models/Note';

describe('NoteService - List', () => {
  let service: NoteServiceImpl;

  beforeEach(() => {
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('comienza con una lista de notas vacia', () => {
    expect(service.listNotes()).toEqual([]);
  });

  it('se listan las notas recien creadas', () => {
    const newNotes: NewNote[] = [
      { title: 'A', content: 'B' },
      { title: 'C', content: 'D' },
    ];

    newNotes.forEach((note) => service.createNote(note));

    const notes = service.listNotes();

    expect(notes).toHaveLength(2);
    expect(notes[0].title).toEqual('A');
    expect(notes[0].content).toEqual('B');
    expect(notes[1].title).toEqual('C');
    expect(notes[1].content).toEqual('D');
  });
});
