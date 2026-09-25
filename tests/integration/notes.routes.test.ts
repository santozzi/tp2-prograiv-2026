import request from 'supertest';
import { makeApp } from '../../src/app';
import { beforeEach, describe, expect, it } from 'vitest';
import type { Express } from 'express';
import { NewNote } from '../../src/models/Note';
import { title } from 'process';

describe('Notes Routes (Integration)', () => {
  let app: Express;

  beforeEach(() => {
    app = makeApp(':memory:');
  });

  describe('GET /notes/:id - Ejercicio 3', () => {
    it('nota con id inexistente retorna 404', async () => {
      const res = await request(app).get('/notes/100');

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error', 'NotFound');
    });

    it('nota con id existente la retorna correctamente', async () => {
      const newNote: NewNote = { title: 'ABC', content: 'DEF' };
      await request(app).post('/notes').send(newNote);

      const res = await request(app).get('/notes/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('title', newNote.title);
      expect(res.body).toHaveProperty('content', newNote.content);
      expect(res.body).toHaveProperty('pinned', false);
    });
  });

  describe('PATCH/notes/:id - Ejercicio 4', () => {
    it('Update nota con título', async () => {
      const NewNote: NewNote = { title: 'Titulo', content: 'Contenido' };
      const createRespuesta = await request(app).post('/notes').send(NewNote);
      const id = createRespuesta.body.id;

      const tituloNuevo = 'NUEVO TÍTULO';
      const respuesta = await request(app).patch(`/notes/${id}`).send({ title: tituloNuevo });

      expect(respuesta.statusCode).toBe(200);
      expect(respuesta.body).toHaveProperty('title', tituloNuevo);
      expect(respuesta.body).toHaveProperty('content', NewNote.content);
    });

    it('Update nota con contenido', async () => {
      const NewNote: NewNote = { title: 'Titulo', content: 'Contenido' };
      const createRespuesta = await request(app).post('/notes').send(NewNote);
      const id = createRespuesta.body.id;

      const contenidoNuevo = 'CONTENIDO NUEVO';
      const respuesta = await request(app).patch(`/notes/${id}`).send({ content: contenidoNuevo });

      expect(respuesta.statusCode).toBe(200);
      expect(respuesta.body).toHaveProperty('content', contenidoNuevo);
      expect(respuesta.body).toHaveProperty('title', NewNote.title);
    });

    it('PATCH: nota con id inexistente retorna 404', async () => {
      const respuesta = await request(app).patch('/notes/100').send({title: "Título"});
      expect(respuesta.statusCode).toBe(404);
      expect(respuesta.body).toHaveProperty('error', 'NotFound');
    });
  });

    describe('DELETE/notes/:id - Ejercicio 5', () => {
    it('Delete nota por id', async () => {
      const notaNueva: NewNote = { title: 'TITULO', content: 'CONTENIDO' };
      const createRespuesta = await request(app).post('/notes').send(notaNueva);
      const id = createRespuesta.body.id;

      const respuesta = await request(app).delete(`/notes/${id}`);

      expect(respuesta.statusCode).toBe(204);
    });

    it('DELETE: nota con id inexistente retorna 404', async () =>{
      const respuesta = (await request(app).delete('/notes/100'))
      expect(respuesta.statusCode).toBe(404);
      expect(respuesta.body).toHaveProperty('error', 'NotFound');
    });
  });
});
