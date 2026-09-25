import { NoteRepository } from '../repositories/NoteRepository';
import { Note, NewNote, NotePatch } from '../models/Note';
import { notify } from './notificationService';

// Contrato fijo. Las rutas (src/routes/notes.ts) y los tests de la cátedra
// llaman a estos 5 métodos por su nombre exacto: no los renombren.
export interface NoteService {
  createNote(data: NewNote): Note;
  listNotes(): Note[];
  getNote(id: number): Note | undefined;
  updateNote(id: number, patch: NotePatch): Note | undefined;
  deleteNote(id: number): boolean;
}

export class NoteServiceImpl implements NoteService {
  constructor(private readonly repo: NoteRepository) {}

  createNote(data: NewNote): Note {
  const nota = this.repo.create(data);

  if (data.pinned === true) {
    notify(nota);
  }

  return nota;
}

  listNotes(): Note[] {
    // 🟢 EJERCICIO 2: esta función YA FUNCIONA.
    // No existe todavía el archivo tests/unit/noteService.list.test.ts:
    // escríbanlo ustedes cubriendo al menos "lista vacía" y "varias notas".
    return this.repo.findAll();
  }

  getNote(id: number): Note | undefined {
    // 🔴🟢 EJERCICIO 3: ciclo completo (test + implementación).
    return this.repo.findById(id);
  }

  updateNote(id: number, patch: NotePatch): Note | undefined {
    // 🔴🟢 EJERCICIO 4: ciclo completo. Es una actualización PARCIAL:
    // si patch solo trae `title`, `content` no debe cambiar (y viceversa).
    return this.repo.update(id, patch)
  }

  deleteNote(id: number): boolean {
    // 🔴🟢 EJERCICIO 5: ciclo completo.
    return this.repo.delete(id);
  }
}
