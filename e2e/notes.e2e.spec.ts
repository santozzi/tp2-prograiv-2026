import { test, expect } from '@playwright/test';
import { resetAndSeed } from './helpers';

test.describe('Notes API - E2E', () => {
  test.beforeEach(async ({ baseURL }) => {
    await resetAndSeed(baseURL!);
  });

  test('crea una nota y luego aparece al listarlas', async ({ request }) => {
    const createResponse = await request.post('/notes', {
      data: {
        title: 'Comprar pan',
        content: 'Antes de las 20hs',
        pinned: false,
      },
    });

    expect(createResponse.status()).toBe(201);

    const createdNote = await createResponse.json();

    expect(createdNote.title).toBe('Comprar pan');
    expect(createdNote.content).toBe('Antes de las 20hs');

    const listResponse = await request.get('/notes');

    expect(listResponse.status()).toBe(200);

    const notes = await listResponse.json();

    expect(notes).toContainEqual(createdNote);
  });

  test('devuelve 404 al buscar una nota inexistente', async ({ request }) => {
    const response = await request.get('/notes/999999');

    expect(response.status()).toBe(404);
  });
});