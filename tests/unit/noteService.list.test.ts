import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - listNotes (Ejercicio 2)', () => { //Describe se usa para agrupar los tests en un mismo grupo.
  let service: NoteServiceImpl; //Una variable para almacenar la instancia del servicio que se va a probar.

  beforeEach(() => {
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db); //Crea una instancia de la clase SqliteNoteRepository.
    service = new NoteServiceImpl(repo); //Crea una instancia de la clase NoteServiceImpl, pasando el repositorio como argumento.
  });

  it('devuelve una lista vacía cuando no hay notas', () => {
    expect(service.listNotes()).toEqual([]);
  });

  it('devuelve todas las notas en el orden en que fueron creadas', () => {
  const createdNotes = [];

  for (let i = 1; i <= 10; i++) {
    createdNotes.push(
      service.createNote({
        title: `Nota ${i}`,
        content: `Contenido ${i}`,
      })
    );
  }

  expect(service.listNotes()).toEqual(createdNotes);
});
});