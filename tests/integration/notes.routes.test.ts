import { beforeEach, describe, expect, it } from 'vitest';
import { makeApp } from '../../src/app';
import { type Express } from 'express';
import request from 'supertest';
import { NewNote } from '../../src/models/Note';

describe('Note Routes', () => {
  let app: Express;

  beforeEach(() => {
    app = makeApp(':memory:');
  });

  describe('GET /notes/:id', () => {
    it('obtener una nota inexistente retorna 404', async () => {
      const response = await request(app).get('/notes/999');

      expect(response.statusCode).toEqual(404);
      expect(response.body).toEqual({ error: 'NotFound' });
    });

    it('retorna 200 con una nota recien creada', async () => {
      const newNote: NewNote = { title: 'A', content: 'B' };
      const createdResponse = await request(app).post('/notes').send(newNote);
      const getResponse = await request(app).get(`/notes/${createdResponse.body.id}`);

      expect(getResponse.statusCode).toBe(200);
      expect(getResponse.body.id).toEqual(1);
      expect(getResponse.body.title).toEqual(newNote.title);
      expect(getResponse.body.content).toEqual(newNote.content);
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

});
