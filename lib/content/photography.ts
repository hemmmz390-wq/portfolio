import { Photograph } from "@/lib/types";

// Shown in full colour: the grading is part of the work. Alt text describes
// what is in frame rather than naming places or events.
export const photographs: Photograph[] = [
  {
    // Cropped to 16:9 from the original portrait so it pairs with the ARSPACE
    // frame; the crop keeps the full figure and chair but loses the lamp.
    src: "/images/photography/award-reading-room-wide.webp",
    alt: "A person seated on a chair reading a sheet of paper in a dark room, framed between two tall wardrobes",
    width: 1401,
    height: 787,
    award: { result: "3rd Place", competition: "ENLIGHT 2025 Photography Competition" },
  },
  {
    src: "/images/photography/award-table-light.webp",
    alt: "A person resting their head on their arms at a white table, sunlight casting soft shapes across the wall behind",
    width: 1280,
    height: 719,
    award: {
      result: "Top Five",
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
  {
    src: "/images/photography/temple-offering-walk.webp",
    alt: "A woman in white temple dress walking past a carved stone gate, a woven basket of offerings balanced on her head",
    width: 2000,
    height: 1127,
  },
  {
    src: "/images/photography/sunset-jump-field.webp",
    alt: "Two people silhouetted mid-jump over a field at sunset, the sun low behind them",
    width: 965,
    height: 543,
  },
];
