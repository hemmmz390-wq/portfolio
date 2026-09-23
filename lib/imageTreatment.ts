import { ImageTreatment } from "@/lib/types";

const treatments: Record<ImageTreatment, string> = {
  normal: "",
  grayscale: "grayscale",
  highContrast: "grayscale contrast-125 brightness-90",
  monochrome: "grayscale contrast-150 brightness-75",
};

export function imageTreatmentClass(treatment: ImageTreatment): string {
  return treatments[treatment];
}
