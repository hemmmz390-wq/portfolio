"use client";

import { useState } from "react";
import { Capability } from "@/lib/types";

interface CapabilitiesProps {
  capabilities: Capability[];
}

export function Capabilities({ capabilities }: CapabilitiesProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <ul className="border-t border-border">
      {capabilities.map((capability, index) => {
        const dimmed = activeIndex !== null && activeIndex !== index;
        return (
          <li
            key={capability.number}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            className="flex flex-col gap-3 border-b border-border py-7 tablet:flex-row tablet:items-center tablet:justify-between"
          >
            <div className="flex items-baseline gap-5">
              <span className="font-body text-[10px] tracking-[0.25em] text-muted">
                {capability.number}
              </span>
              <h3
                className={`font-display text-2xl uppercase tracking-tight transition-opacity duration-300 tablet:text-4xl ${
                  dimmed ? "opacity-30" : "opacity-100"
                }`}
              >
                {capability.title}
              </h3>
            </div>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 tablet:justify-end">
              {capability.tools.map((tool) => (
                <li
                  key={tool}
                  className="font-body text-[10px] uppercase tracking-[0.2em] text-muted"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
