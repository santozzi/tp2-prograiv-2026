import { beforeEach,describe, expect, it } from 'vitest';
import { createDb } from '../../src/db/connection';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';import { NoteServiceImpl } from '../../src/services/NoteService';

describe('NoteService - getNote(EJERCICIO 3',()=>{
    let repo: SqliteNoteRepository;
    let service: NoteServiceImpl;

    beforeEach(()=>{
        const db= createDb(':memory:');
        repo = new SqliteNoteRepository(db);
        service = new NoteServiceImpl(repo);
    });
    it('devuelvo la nota correspondiente al ID solicitado', ()=>{
        repo.create({ title:'Primera', content: 'Contenido A'});
        const segunda = repo.create({title: 'Segunda',content: 'Contenido B'});
    const resultado = service.getNote(segunda.id);
    expect(resultado).toEqual(segunda);
    });
    it('devuelve undefined cuando el ID no exisste',()=>{
        const resultado = service.getNote(999)
        expect(resultado).toBeUndefined();
    });
});