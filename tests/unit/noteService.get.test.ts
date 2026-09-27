import { describe, it, expect, beforeEach } from 'vitest';

import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - getNote (Ejercicio 3)', () => {
    let service: NoteServiceImpl;
    let repo: SqliteNoteRepository;

    beforeEach(() => {
        const db = createDb(':memory:');
        repo = new SqliteNoteRepository(db);
        service = new NoteServiceImpl(repo);
    });

    it('obtiene una nota existente por su id', () => {
        const creada = repo.create({
            title: 'Comprar pan',
            content: 'Antes de las 20hs'
        });

        const encontrada = service.getNote(creada.id);

        expect(encontrada).toBeDefined();
        expect(encontrada?.id).toBe(creada.id);
        expect(encontrada?.title).toBe('Comprar pan');
        expect(encontrada?.content).toBe('Antes de las 20hs');
    });

    it('devuelve indefinido si el id no existe', () => {
        const encontrada = service.getNote(999);

        expect(encontrada).toBeUndefined();
    });
});