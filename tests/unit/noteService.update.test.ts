import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';
import { NotePatch } from '../../src/models/Note';
import { beforeEach, describe, expect, it } from 'vitest';


describe ('noteService - updateNote (Ejercicio 4)', () => {
    let service: NoteServiceImpl;
    let repo: SqliteNoteRepository;

    beforeEach(() => {
    const db = createDb(':memory:');
    repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
    });

    it ('Ingreso nota por id y le cambio el title', () => {
        const newNote: NotePatch = {title: 'TITULO', content: 'contenido'};
        const notaCreada = service.createNote(newNote);

        const titleNuevo = 'NUEVO TÍTULO';
        const updated = service.updateNote(notaCreada.id, {title: titleNuevo});

        expect(updated).toBeDefined();
        expect(updated).toHaveProperty('title', titleNuevo);  
    })

    it ('Ingreso nota por id y le cambio el contenido', () => {
        const NewNote: NotePatch={title: 'TITULO', content: 'CONTENT'};
        const notaCreada = service.createNote(NewNote);

        const contenidoNuevo = 'CONTENIDO NUEVO';
        const updated = service.updateNote(notaCreada.id, {content: contenidoNuevo});

        expect(updated).toBeDefined();
        expect(updated).toHaveProperty('content', contenidoNuevo);
    });
});
