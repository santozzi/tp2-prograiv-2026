import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';
import { notify } from '../../src/services/notificationService';

// Reemplazamos todo el modulo por un mock: notify pasa a ser una funcion falsa
// que registra con que se la llamo, sin hacer nada real.
vi.mock('../../src/services/notificationService', () => ({
  notify: vi.fn(),
}));

describe('NoteService - notificacion al fijar (Ejercicio 6)', () => {
  let service: NoteServiceImpl;

  beforeEach(() => {
    vi.clearAllMocks(); // resetea las llamadas registradas entre un test y otro
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('si la nota se crea con pinned: true, llama a notify con la nota creada', () => {
    const note = service.createNote({ title: 'Importante', content: 'X', pinned: true });

    expect(notify).toHaveBeenCalledTimes(1);
    expect(notify).toHaveBeenCalledWith(note);
  });

  it('si la nota se crea con pinned: false, NO llama a notify', () => {
    service.createNote({ title: 'Normal', content: 'Y', pinned: false });
    expect(notify).not.toHaveBeenCalled();
  });

  it('si no se indica pinned, NO llama a notify', () => {
    service.createNote({ title: 'Sin pinned', content: 'Z' });
    expect(notify).not.toHaveBeenCalled();
  });
});