import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/Footer";

const socials = [{ label: "Instagram", url: "https://instagram.com/bert_alwi" }];
const links = [{ label: "About", href: "/about" }];

function renderFooter() {
  return render(
    <Footer
      name="Elbert Alwi"
      email="elbertalwi0103@gmail.com"
      socials={socials}
      links={links}
    />
  );
}

describe("Footer", () => {
  it("renders the email as a mailto link", () => {
    renderFooter();
    expect(screen.getByRole("link", { name: "elbertalwi0103@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:elbertalwi0103@gmail.com"
    );
  });

  it("renders social links that open safely in a new tab", () => {
    renderFooter();
    const social = screen.getByRole("link", { name: "Instagram" });
    expect(social).toHaveAttribute("href", "https://instagram.com/bert_alwi");
    expect(social).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders navigation links including home", () => {
    renderFooter();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
  });

  it("renders the current year in the copyright line", () => {
    renderFooter();
    expect(screen.getByText(new RegExp(`${new Date().getFullYear()}`))).toBeInTheDocument();
  });
});
