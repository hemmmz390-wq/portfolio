import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MobileMenu } from "@/components/layout/MobileMenu";

const links = [{ label: "About", href: "/about" }];
const socials = [{ label: "Instagram", url: "https://instagram.com/bert_alwi" }];

describe("MobileMenu", () => {
  it("renders nothing when closed", () => {
    const { container } = render(
      <MobileMenu links={links} socials={socials} isOpen={false} onClose={vi.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders links and socials when open", () => {
    render(<MobileMenu links={links} socials={socials} isOpen onClose={vi.fn()} />);
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: /instagram/i })).toHaveAttribute(
      "href",
      "https://instagram.com/bert_alwi"
    );
  });

  it("calls onClose when the close button is clicked", () => {
    const onClose = vi.fn();
    render(<MobileMenu links={links} socials={socials} isOpen onClose={onClose} />);
    screen.getByRole("button", { name: /close menu/i }).click();
    expect(onClose).toHaveBeenCalled();
  });
});
