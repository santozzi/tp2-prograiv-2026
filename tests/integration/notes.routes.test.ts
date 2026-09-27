import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { makeApp } from '../../src/app';

describe('GET /notes/:id', () => {
    it('responde 404 cuando la nota no existe', async () => {
        const app = makeApp(':memory:');
        const response = await request(app).get('/notes/999');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'NotFound' });
    });

    it('responde 200 con la nota solicitada', async () => {
        const app = makeApp(':memory:');
        const created = await request(app)
        .post('/notes')
        .send({ title: 'Primera', content: 'Contenido A' });

        expect(created.status).toBe(201);

        const response = await request(app).get(`/notes/${created.body.id}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(created.body);
    });
});

describe('PATCH /notes/:id', () => {
    it('responde 404 cuando la nota no existe', async () => {
        const app = makeApp(':memory:');
        const response = await request(app)
        .patch('/notes/999')
        .send({ title: 'Titulo nuevo' });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'NotFound' });
    });

    it('responde 200 y conserva los campos no modificados', async () => {
        const app = makeApp(':memory:');
        const created = await request(app)
        .post('/notes')
        .send(
            { title: 'Original', content: 'Sin cambios', pinned: true }
        );

        expect(created.status).toBe(201);

        const response = await request(app)
        .patch(`/notes/${created.body.id}`)
        .send(
            { title: 'Nuevo' }
        );

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            id: created.body.id,
            title: 'Nuevo',
            content: 'Sin cambios',
            pinned: true,
            createdAt: created.body.createdAt
        });

        const persisted = await request(app).get(`/notes/${created.body.id}`);
        expect(persisted.status).toBe(200);
        expect(persisted.body).toEqual(response.body);
    });
});
describe('DELETE /notes/:id (Ejercicio 5)', () => {
  let app: ReturnType<typeof makeApp>;

  beforeEach(() => {
    app = makeApp(':memory:');
  });

  it('elimina una nota y responde 204', async () => {
    const createRes = await request(app)
      .post('/notes')
      .send({ title: 'Para borrar', content: 'Contenido' });

    const id = createRes.body.id;

    const deleteRes = await request(app).delete(`/notes/${id}`);

    expect(deleteRes.status).toBe(204);
  });

  it('la nota eliminada ya no se puede obtener (404)', async () => {
    const createRes = await request(app)
      .post('/notes')
      .send({ title: 'Para borrar', content: 'Contenido' });

    const id = createRes.body.id;
    await request(app).delete(`/notes/${id}`);

    const getRes = await request(app).get(`/notes/${id}`);

    expect(getRes.status).toBe(404);
  });

  it('devuelve 404 si el id no existe', async () => {
    const res = await request(app).delete('/notes/99999');
    expect(res.status).toBe(404);
  });
});