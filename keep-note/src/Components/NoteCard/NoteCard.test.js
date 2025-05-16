import { render, screen } from "@testing-library/react";
import NoteCard from "./NoteCard";

test("Should render note title and content", () => {
  const mockTask = {
    title: "Test Task",
    content: "This is a test task description.",
    status: "pending",
  };

  render(<NoteCard taskData={mockTask} />);

  expect(screen.getByText("Test Task")).toBeInTheDocument();
  expect(screen.getByText("This is a test task description.")).toBeInTheDocument();
});
