import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - deleteNote (Ejercicio 5)', () => {
  let service: NoteServiceImpl;

  beforeEach(() => {
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('elimina una nota existente y devuelve true', () => {
    const created = service.createNote({ title: 'A', content: 'B' });

    const result = service.deleteNote(created.id);

    expect(result).toBe(true);
  });

  it('la nota eliminada ya no aparece en listNotes', () => {
    const created = service.createNote({ title: 'A', content: 'B' });
    service.deleteNote(created.id);

    expect(service.listNotes()).toHaveLength(0);
  });

  it('la nota eliminada ya no se puede obtener con getNote', () => {
    const created = service.createNote({ title: 'A', content: 'B' });
    service.deleteNote(created.id);

    expect(service.getNote(created.id)).toBeUndefined();
  });

  it('devuelve false si el id no existe', () => {
    const result = service.deleteNote(999);
    expect(result).toBe(false);
  });
});