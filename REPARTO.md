## Reparto de ejercicios

### Integrante 1: crear notas y notificaciones

- **Ejercicios**: 1 y 6.
- **Archivos**:
  - `src/services/NoteService.ts`: implementar `createNote` y agregar la llamada a `notify` cuando `pinned: true`.
  - `tests/unit/noteService.create.test.ts`: ya existe; no modificarlo.
  - `tests/unit/noteService.notify.test.ts`: crear el test usando `vi.mock` para `notificationService`.
- **Nota**: el Ejercicio 6 depende de que el Ejercicio 1 esté terminado.

### Integrante 2: listar y modificar notas

- **Ejercicios**: 2 y 4.
- **Archivos**:
  - `tests/unit/noteService.list.test.ts`: crear tests para lista vacía y varias notas.
  - `src/services/NoteService.ts`: implementar `updateNote`.
  - `tests/unit/noteService.update.test.ts`: crear tests de actualización parcial.
  - `tests/integration/notes.routes.test.ts`: agregar tests para `PATCH /notes/:id`.
- **Nota**: `listNotes` ya está implementado; en el Ejercicio 2 solo hay que agregar los tests.

### Integrante 3: obtener una nota

- **Ejercicio**: 3.
- **Archivos**:
  - `src/services/NoteService.ts`: implementar `getNote`.
  - `tests/unit/noteService.get.test.ts`: crear tests para una nota existente y un ID inexistente.
  - `tests/integration/notes.routes.test.ts`: agregar tests para `GET /notes/:id`, incluyendo la respuesta `404`.

### Integrante 4: eliminar notas

- **Ejercicio**: 5.
- **Archivos**:
  - `src/services/NoteService.ts`: implementar `deleteNote`.
  - `tests/unit/noteService.delete.test.ts`: crear tests para eliminación exitosa y para un ID inexistente.
  - `tests/integration/notes.routes.test.ts`: agregar tests para `DELETE /notes/:id`.

### Integrante 5: flujo end-to-end

- **Ejercicio**: 7.
- **Archivos**:
  - `e2e/notes.e2e.spec.ts`: crear un happy path y un caso de error con Playwright.
  - `e2e/helpers.ts`: usar el helper existente; modificarlo solo si fuera estrictamente necesario.
- **Nota**: realizarlo después de que los Ejercicios 1 a 6 estén funcionando. No es necesario modificar la configuración de Playwright.