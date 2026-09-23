import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/contact/ContactForm";

describe("ContactForm", () => {
  it("shows validation errors when required fields are empty", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/message is required/i)).toBeInTheDocument();
  });

  it("rejects a malformed email", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/^email$/i), "not-an-email");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/enter a valid email/i)).toBeInTheDocument();
  });

  it("shows a success state after a valid submit", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/^name$/i), "Test User");
    await user.type(screen.getByLabelText(/^email$/i), "test@example.com");
    await user.type(screen.getByLabelText(/^message$/i), "Hello there");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    });
  });
});
