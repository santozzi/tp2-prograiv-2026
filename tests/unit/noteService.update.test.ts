import { beforeEach, describe, expect, it } from 'vitest';
import { createDb } from '../../src/db/connection';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { NoteServiceImpl } from '../../src/services/NoteService';


describe('NoteService - updateNote (Ejercicio4)', () => {
    let repo: SqliteNoteRepository;
    let service: NoteServiceImpl;

    beforeEach(() => {
        const db = createDb(':memory:');
        repo = new SqliteNoteRepository(db);
        service = new NoteServiceImpl(repo);
    });

    it('actualiza solo el titulo y conserva los demas campos', () => {
        const original = repo.create({
        title: 'Titulo original',
        content: 'Contenido original',
        pinned: true
        });

        const actualizada = service.updateNote(original.id, { title: 'Titulo nuevo' });

        expect(actualizada).toMatchObject({
        id: original.id,
        title: 'Titulo nuevo',
        content: original.content,
        pinned: original.pinned,
        createdAt: original.createdAt
        });
        expect(repo.findById(original.id)).toEqual(actualizada);
    });

    it('actualiza solo el contenido y conserva el titulo', () => {
        const original = repo.create({
        title: 'Titulo original',
        content: 'Contenido original'
        });

        const actualizada = service.updateNote(original.id, {
        content: 'Contenido nuevo'
        });

        expect(actualizada).toMatchObject({
        title: original.title,
        content: 'Contenido nuevo'
        });
    });

    it('permite cambiar pinned de true a false', () => {
        const original = repo.create({
        title: 'Una nota',
        content: 'Su contenido',
        pinned: true
        });

        const actualizada = service.updateNote(original.id, { pinned: false });

        expect(actualizada).toMatchObject({
        title: original.title,
        content: original.content,
        pinned: false
        });
    });

    it('devuelve undefined si el id no existe y conserva otras notas', () => {
        const original = repo.create({
        title: 'Una nota',
        content: 'Su contenido'
        });

        const resultado = service.updateNote(original.id + 1, {
        title: 'No debe aparecer'
        });

        expect(resultado).toBeUndefined();
        expect(repo.findById(original.id)).toEqual(original);
    });
});