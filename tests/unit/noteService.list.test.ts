
import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - listNotes (Ejercicio 2)', () => {
  let service: NoteServiceImpl;

  beforeEach(() => {
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('debería devolver una lista vacía cuando no hay notas', () => {
    const result = service.listNotes();
    expect(result).toHaveLength(0);
  });

  it('debería devolver varias notas cuando existen', () => {
    service.createNote({ title: 'Nota 1', content: 'Cont 1' });
    service.createNote({ title: 'Nota 2', content: 'Cont 2' });

    const result = service.listNotes();
    
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe('Nota 1');
    expect(result[1].title).toBe('Nota 2');
  });
});
