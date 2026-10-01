import { Photograph } from "@/lib/types";

// Shown in full colour: the grading is part of the work. Alt text describes
// what is in frame rather than naming places or events.
export const photographs: Photograph[] = [
  {
    src: "/images/photography/award-reading-room.webp",
    alt: "A person seated on a chair reading a sheet of paper in a dark room between two tall wardrobes, lit by a single lamp",
    width: 1401,
    height: 1600,
    award: { result: "Winner", competition: "ENLIGHT 2025 Photography Competition" },
  },
  {
    src: "/images/photography/award-table-light.webp",
    alt: "A person resting their head on their arms at a white table, sunlight casting soft shapes across the wall behind",
    width: 1280,
    height: 719,
    award: {
      result: "Top 5",
      competition: "ARSPACE Photography Competition, Universitas Ciputra Surabaya",
    },
  },
  {
    src: "/images/photography/sea-temple.webp",
    alt: "A sea temple on a rock outcrop, waves washing over the reef at its base under a clear blue sky",
    width: 2000,
    height: 1125,
  },
  {
    src: "/images/photography/clifftop-path.webp",
    alt: "A paved clifftop walkway with a wooden railing, trees and lawn on one side and the ocean breaking below",
    width: 2000,
    height: 1125,
  },
  {
    src: "/images/photography/greenhouse-group.webp",
    alt: "A group of young people talking and laughing on the grass in front of a large mesh greenhouse",
    width: 2000,
    height: 1333,
  },
  {
    src: "/images/photography/cave-ceremony.webp",
    alt: "People in white ceremonial dress gathered at the mouth of a sea cave, one wading through the shallows",
    width: 2000,
    height: 1123,
  },
];
