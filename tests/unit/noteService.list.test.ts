import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - listNotes (Ejercicio 2)', () => {
    let service: NoteServiceImpl;
    let repo: SqliteNoteRepository;

beforeEach(() => {
    const db = createDb(':memory:');
    repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
});

it('devuelve una lista vacía cuando no hay notas', () => {
    const notas = service.listNotes();
    expect(notas).toEqual([]);
});

it('devuelve la lista completa cuando hay varias notas', () => {
    repo.create({ title: 'Nota 1', content: 'Contenido 1' });
    repo.create({ title: 'Nota 2', content: 'Contenido 2' });

    const notas = service.listNotes();

    expect(notas.length).toBe(2);
    expect(notas[0].title).toBe('Nota 1');
    expect(notas[1].title).toBe('Nota 2');
});

});