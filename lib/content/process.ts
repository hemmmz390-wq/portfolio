import { ProcessStep } from "@/lib/types";

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "Understand the problem, the people it affects, and the constraints around it before writing a line of code.",
  },
  {
    number: "02",
    title: "Define",
    description:
      "Decide what actually needs to exist. Anything that doesn't serve the core problem gets cut.",
  },
  {
    number: "03",
    title: "Design",
    description: "Shape the structure, the flow, and the visual language the work will live in.",
  },
  {
    number: "04",
    title: "Build",
    description:
      "Write the code, take the shots, cut the footage — turn the plan into something real.",
  },
  {
    number: "05",
    title: "Refine",
    description: "Use it, test it, break it, and fix whatever doesn't hold up.",
  },
  {
    number: "06",
    title: "Launch",
    description: "Ship it, then watch how it behaves once real people are using it.",
  },
];
