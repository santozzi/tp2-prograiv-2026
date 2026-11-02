import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';
import { notify } from '../../src/services/notificationService';

// notify pasa a ser un mock y no se ejecuta el real
vi.mock('../../src/services/notificationService', () => ({
  notify: vi.fn(),
}));

describe('NoteService - notificación al fijar (Ejercicio 6)', () => {
  let service: NoteServiceImpl;

  beforeEach(() => {
    vi.clearAllMocks();
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('llama a notify con la nota creada cuando pinned es true', () => {
    const note = service.createNote({ title: 'Importante', content: 'No olvidar', pinned: true });

    expect(notify).toHaveBeenCalledTimes(1);
    expect(notify).toHaveBeenCalledWith(note);
  });

  it('no llama a notify cuando pinned es false', () => {
    service.createNote({ title: 'Común', content: 'x', pinned: false });

    expect(notify).not.toHaveBeenCalled();
  });

  it('no llama a notify cuando no se indica pinned', () => {
    service.createNote({ title: 'Sin pinned', content: 'x' });

    expect(notify).not.toHaveBeenCalled();
  });
});