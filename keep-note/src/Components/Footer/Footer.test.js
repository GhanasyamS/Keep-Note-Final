import { render, screen, cleanup } from "@testing-library/react";
import Footer from "./Footer";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";

describe("Test Footer component", () => {
  afterEach(() => {
    cleanup();
  });

  test("Should render footer with copyright details", () => {
    render(<Footer />);
    
    const footer = screen.getByRole("contentinfo"); 

    const copyrightText = screen.getByText(/© 2024 Keep Note. All rights reserved./i);
    expect(copyrightText).toBeInTheDocument();
  });

  test("Should verify social media URL links", () => {
    render(<Footer />);
    
    const links = screen.getAllByRole("link"); 
    expect(links).toHaveLength(3);

    expect(links[0]).toHaveAttribute("href", "https://www.facebook.com");
    expect(links[1]).toHaveAttribute("href", "https://www.instagram.com");
    expect(links[2]).toHaveAttribute("href", "https://www.linkedin.com");
  });

  test("Should check for specific social media icons", () => {
    render(<Footer />);

    expect(screen.getByTestId("facebook-icon")).toBeInTheDocument();
    expect(screen.getByTestId("instagram-icon")).toBeInTheDocument();
    expect(screen.getByTestId("linkedin-icon")).toBeInTheDocument();
  });
});
