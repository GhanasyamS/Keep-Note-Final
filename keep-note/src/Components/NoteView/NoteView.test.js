import { render, screen } from "@testing-library/react";
import NoteView from "./NoteView";

describe("Test NoteView component", () => {
  const mockNotes = {
    notes: [
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
    ],
  };

  test("Should render title and NoteView component", () => {
    render(<NoteView taskList={mockNotes.notes} />);
    
    // Verify the title is rendered
    const titleElement = screen.getByText(/Checklist Chronicles: Conquering Tasks One Tick at a Time/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("Should pass notes prop to NoteList component", () => {
    render(<NoteView taskList={mockNotes.notes} />);
    
    // Ensure the NoteList component is rendered
    const noteListComponent = screen.getByTestId("note-list");
    expect(noteListComponent).toBeInTheDocument();

    // Verify it correctly displays note titles
    mockNotes.notes.forEach((note) => {
      expect(screen.getByText(note.title)).toBeInTheDocument();
    });
  });
});
