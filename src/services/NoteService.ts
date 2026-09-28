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
    // Hecho Garcia: EJERCICIO 1: ciclo completo (test + implementación).
    // 🔴🟢 EJERCICIO 6 (a hacer más adelante, ustedes escriben el test):
    // una vez que este método esté en verde, agréguenle: si `data.pinned`
    // es true, además deben llamar a notify(nota) del módulo
    // notificationService. En el test, simulen ese módulo completo con
    // vi.mock y verifiquen la llamada con toHaveBeenCalledWith.
    return this.repo.create(data); 
    // ahora mismo no hace nada más que delegar en el repo, pero luego
    // agregaremos la notificación si la nota es "pinned".
    // 🔴🟢 EJERCICIO 6: si la nota se crea con pinned: true,
    // se llama a notify(nota) del modulo notificationService.
    const note = this.repo.create(data);
    if (data.pinned) {
      notify(note);
    }
    return note;
  }

  listNotes(): Note[] {
    // HECHO Garcia:🟢 EJERCICIO 2: esta función YA FUNCIONA.
    // escríbanlo ustedes cubriendo al menos "lista vacía" y "varias notas".
    return this.repo.findAll();
  }

  getNote(id: number): Note | undefined {
    // 🔴🟢 EJERCICIO 3: ciclo completo (test + implementación).
    throw new Error('getNote: no implementado (Ejercicio 3)');
  }

  updateNote(id: number, patch: NotePatch): Note | undefined {
    // 🔴🟢 EJERCICIO 4: ciclo completo. Es una actualización PARCIAL:
    // si patch solo trae `title`, `content` no debe cambiar (y viceversa).
    throw new Error('updateNote: no implementado (Ejercicio 4)');
  }

  deleteNote(id: number): boolean {
    // 🔴🟢 EJERCICIO 5: ciclo completo.
    throw new Error('deleteNote: no implementado (Ejercicio 5)');
  }
}