import { describe, expect, it, vi } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { NoteRepository } from '../../src/repositories/NoteRepository';
import { notify } from '../../src/services/notificationService';

vi.mock('../../src/services/notificationService', () => ({
  notify: vi.fn(),
}));

describe('NoteService - notifications (Ejercicio 6)', () => {
  it('notifica cuando una nota es creada como fijada (pinned)', () => {
    const repo = {
      create: vi.fn((data) => ({
        id: 1,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })),
    } as unknown as NoteRepository;

    const servicio = new NoteServiceImpl(repo);

    const nota = servicio.createNote({
      title: 'Nota de prueba',
      content: 'Contenido de prueba',
      pinned: true,
    });

    expect(notify).toHaveBeenCalledWith(nota);
  });
});