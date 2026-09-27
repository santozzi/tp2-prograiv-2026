import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createDb } from '../../src/db/connection';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { notify } from '../../src/services/notificationService';

vi.mock('../../src/services/notificationService', () => ({
  notify: vi.fn()
}));

describe('NoteService - notify (Ejercicio 6)', () => {
  let service: NoteServiceImpl;

  beforeEach(() => {
    vi.clearAllMocks();
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('notifica con la nota creada cuando pinned es true', () => {
    const note = service.createNote({
      title: 'Nota con pin',
      content: 'Con prioridad',
      pinned: true
    });

    expect(notify).toHaveBeenCalledOnce();
    expect(notify).toHaveBeenCalledWith(note);
  });

  it('no notifica cuando la nota no está fijada', () => {
    service.createNote({
      title: 'Nota común',
      content: 'Sin prioridad'
    });

    expect(notify).not.toHaveBeenCalled();
  });
});