import { describe, it, expect, vi, beforeEach } from "vitest";
import { NoteServiceImpl } from "../../src/services/NoteService";
import { NoteRepository } from "../../src/repositories/NoteRepository";
import { Note } from "../../src/models/Note";

vi.mock("../../src/services/notificationService", () => ({
  notify: vi.fn(),
}));

import { notify } from "../../src/services/notificationService";

describe("NoteService - notificación al fijar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("notifica cuando se crea una nota fijada", () => {
    const nota: Note = {
      id: 1,
      title: "Nota fijada",
      content: "Contenido",
      pinned: true,
      createdAt: "2026-09-25",
      updatedAt: "2026-09-25",
    };

    const repo = {
      create: vi.fn().mockReturnValue(nota),
    } as unknown as NoteRepository;

    const service = new NoteServiceImpl(repo);

    const result = service.createNote({
      title: "Nota fijada",
      content: "Contenido",
      pinned: true,
    });

    expect(result).toEqual(nota);
    expect(notify).toHaveBeenCalledWith(nota);
  });
});
