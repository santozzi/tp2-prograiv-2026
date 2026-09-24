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
    // 🔴 EJERCICIO 1 (dado en rojo en tests/unit/noteService.create.test.ts)
    // Implementen la creación básica: crear la nota en el repositorio y
    // devolverla. Con esto alcanza para que el test de la cátedra pase.
    return this.repo.create(data);

    // 🔴🟢 EJERCICIO 6 (a hacer más adelante, ustedes escriben el test):
    // una vez que este método esté en verde, agréguenle: si `data.pinned`
    // es true, además deben llamar a notify(nota) del módulo
    // notificationService. En el test, simulen ese módulo completo con
    // vi.mock y verifiquen la llamada con toHaveBeenCalledWith.
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
