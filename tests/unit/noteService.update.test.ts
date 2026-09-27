import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - updateNote (Ejercicio 4)', () => {
    let service: NoteServiceImpl;
    let repo: SqliteNoteRepository;

beforeEach(() => {
    const db = createDb(':memory:');
    repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
});

    it('actualiza parcialmente una nota existente (solo el título)', () => {
    const creada = repo.create({
        title: 'Título Original',
        content: 'Contenido Original',
    });

    const actualizada = service.updateNote(creada.id, {
        title: 'Título Modificado',
    });

    expect(actualizada).toBeDefined();
    expect(actualizada?.title).toBe('Título Modificado');
    expect(actualizada?.content).toBe('Contenido Original'); // Verifica que el contenido no cambie
});

    it('devuelve undefined si el id de la nota no existe', () => {
        const resultado = service.updateNote(999, { title: 'Nuevo Título' });
        expect(resultado).toBeUndefined();
    });
});