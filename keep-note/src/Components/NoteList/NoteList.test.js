import { render, screen } from "@testing-library/react";
import NoteList from "./NoteList";

describe("Test NoteList component", () => {
  const mockNotes = [
    {
      id: 1,
      title: "Self-read",
      content:
        "Deep dive the first session, execute demo codes and check for expected output",
      status: "completed",
    },
    {
      id: 2,
      title: "Practice-exercise: HTML",
      content:
        "Develop a responsive web page using Bootstrap. Should use Bootstrap components, forms, grid layout, and utilities to make the web page more aesthetic.",
      status: "yet-to-start",
    },
  ];

  test("Should render a list of note cards", () => {
    render(<NoteList taskList={mockNotes} />);

    // Ensure all notes are rendered
    mockNotes.forEach((note) => {
      expect(screen.getByText(note.title)).toBeInTheDocument();
      expect(screen.getByText(note.content)).toBeInTheDocument();
    });
  });
});
