import { render, screen, fireEvent } from "@testing-library/react";
import SearchNote from "./SearchNote";
import { jest } from "@jest/globals";

describe("SearchNote Component", () => {
  let mockOnSearchNote, mockOnClearNote;

  beforeEach(() => {
    mockOnSearchNote = jest.fn();
    mockOnClearNote = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should render search input box and hide clear button initially", () => {
    render(<SearchNote onSearchNote={mockOnSearchNote} onClearNote={mockOnClearNote} />);
    
    // Check if the search input is in the document
    const searchInput = screen.getByPlaceholderText("Search Notes");
    expect(searchInput).toBeInTheDocument();
    
    // Ensure clear button is not visible initially
    const clearButton = screen.queryByRole("button");
    expect(clearButton).not.toBeInTheDocument();
  });

  test("Should show clear button when search text is entered", () => {
    render(<SearchNote onSearchNote={mockOnSearchNote} onClearNote={mockOnClearNote} />);

    const searchInput = screen.getByPlaceholderText("Search Notes");

    // Simulate typing into input
    fireEvent.change(searchInput, { target: { value: "test" } });

    // Check if the clear button appears
    const clearButton = screen.getByRole("button", { name: "X" });
    expect(clearButton).toBeInTheDocument();
  });

  test("Should simulate input change", () => {
    render(<SearchNote onSearchNote={mockOnSearchNote} onClearNote={mockOnClearNote} />);

    const searchInput = screen.getByPlaceholderText("Search Notes");

    // Simulate typing "note"
    fireEvent.change(searchInput, { target: { value: "note" } });

    // Check if the input value updated
    expect(searchInput.value).toBe("note");

    // Verify if onSearchNote was called with correct value
    expect(mockOnSearchNote).toHaveBeenCalledTimes(1);
    expect(mockOnSearchNote).toHaveBeenCalledWith("note");
  });

  test("Should simulate clear button click", () => {
    render(<SearchNote onSearchNote={mockOnSearchNote} onClearNote={mockOnClearNote} />);

    const searchInput = screen.getByPlaceholderText("Search Notes");

    // Simulate typing something
    fireEvent.change(searchInput, { target: { value: "test" } });

    // Ensure clear button is present
    const clearButton = screen.getByRole("button", { name: "X" });
    expect(clearButton).toBeInTheDocument();

    // Click the clear button
    fireEvent.click(clearButton);

    // Ensure the input is cleared
    expect(searchInput.value).toBe("");

    // Verify if onClearNote was called
    expect(mockOnClearNote).toHaveBeenCalledTimes(1);
  });
});
