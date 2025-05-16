import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import axios from "axios";
import { ErrorBoundary } from "react-error-boundary";
import { jest } from "@jest/globals";
import ErrorFallback from "./Components/ErrorFallback/ErrorFallback";

jest.mock("axios");

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {}); // ✅ Mock console.error
});

afterAll(() => {
  console.error.mockRestore(); // ✅ Restore console.error after tests
});

describe("App Component", () => {
  const mockNotes = [
    { id: 1, title: "Self-read", content: "Read session 1", status: "completed" },
    { id: 2, title: "Practice-exercise: HTML", content: "Bootstrap task", status: "yet-to-start" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithErrorBoundary = () =>
    render(
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <App />
      </ErrorBoundary>
    );

  test("Should render the app with header, search box, note list, and footer", async () => {
    axios.get.mockResolvedValue({ data: mockNotes });

    renderWithErrorBoundary();

    expect(screen.getByText("KeepNote")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search Notes")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Self-read")).toBeInTheDocument();
      expect(screen.getByText("Practice-exercise: HTML")).toBeInTheDocument();
    });

    expect(screen.getByText(/© 2024 Keep Note. All rights reserved./i)).toBeInTheDocument();
  });

  test("Should filter notes based on search text", async () => {
    axios.get.mockResolvedValue({ data: mockNotes });

    renderWithErrorBoundary();

    await waitFor(() => expect(screen.getByText("Self-read")).toBeInTheDocument());

    const searchInput = screen.getByPlaceholderText("Search Notes");
    fireEvent.change(searchInput, { target: { value: "HTML" } });

    await waitFor(() => {
      expect(screen.getByText("Practice-exercise: HTML")).toBeInTheDocument();
      expect(screen.queryByText("Self-read")).not.toBeInTheDocument();
    });
  });

  test("Should handle data fetching errors", async () => {
    axios.get.mockRejectedValue(new Error("Network Error"));

    renderWithErrorBoundary();

    await waitFor(() => {
      expect(screen.getByText("Something went wrong. Try after sometime")).toBeInTheDocument();
    });

    
    expect(console.error).toHaveBeenCalled(); 
  });
});
