import { expect, test } from '@playwright/test';
import { resetAndSeed } from './helpers';

test.beforeEach(async ({ baseURL }) => {
  if (!baseURL) throw new Error('Playwright requiere una baseURL');
  await resetAndSeed(baseURL);
});

test('completa el flujo de crear, obtener, modificar y eliminar una nota', async ({ request }) => {
  const initialListResponse = await request.get('/notes');
  expect(initialListResponse.status()).toBe(200);
  expect(await initialListResponse.json()).toHaveLength(2);

  const createResponse = await request.post('/notes', {
    data: {
      title: 'Preparar entrega',
      content: 'Ejecutar los tests E2E'
    }
  });

  expect(createResponse.status()).toBe(201);
  const createdNote = await createResponse.json();
  expect(createdNote).toMatchObject({
    title: 'Preparar entrega',
    content: 'Ejecutar los tests E2E',
    pinned: false
  });
  expect(createdNote.id).toEqual(expect.any(Number));

  const getResponse = await request.get(`/notes/${createdNote.id}`);
  expect(getResponse.status()).toBe(200);
  expect(await getResponse.json()).toEqual(createdNote);

  const updateResponse = await request.patch(`/notes/${createdNote.id}`, {
    data: { content: 'Tests E2E ejecutados' }
  });

  expect(updateResponse.status()).toBe(200);
  const updatedNote = await updateResponse.json();
  expect(updatedNote).toMatchObject({
    id: createdNote.id,
    title: createdNote.title,
    content: 'Tests E2E ejecutados',
    pinned: createdNote.pinned,
    createdAt: createdNote.createdAt
  });

  const persistedResponse = await request.get(`/notes/${createdNote.id}`);
  expect(persistedResponse.status()).toBe(200);
  expect(await persistedResponse.json()).toEqual(updatedNote);

  const deleteResponse = await request.delete(`/notes/${createdNote.id}`);
  expect(deleteResponse.status()).toBe(204);

  const finalListResponse = await request.get('/notes');
  expect(finalListResponse.status()).toBe(200);
  const finalNotes = await finalListResponse.json();
  expect(finalNotes).toHaveLength(2);
  expect(finalNotes).not.toEqual(
    expect.arrayContaining([expect.objectContaining({ id: createdNote.id })])
  );
});

test('rechaza la creación de una nota sin título y no modifica la lista', async ({ request }) => {
  const createResponse = await request.post('/notes', {
    data: { content: 'Nota sin título' }
  });

  expect(createResponse.status()).toBe(400);
  expect(await createResponse.json()).toMatchObject({
    error: 'ValidationError'
  });

  const listResponse = await request.get('/notes');
  expect(listResponse.status()).toBe(200);
  expect(await listResponse.json()).toHaveLength(2);
});