import { Photograph } from "@/lib/types";
import { PhotoCarousel } from "@/components/photography/PhotoCarousel";

interface PhotographyShowcaseProps {
  photographs: Photograph[];
}

/** Competition work and personal work, each in its own carousel. */
export function PhotographyShowcase({ photographs }: PhotographyShowcaseProps) {
  const awarded = photographs.filter((photo) => photo.award);
  const personal = photographs.filter((photo) => !photo.award);

  return (
    <div className="flex flex-col gap-20">
      {awarded.length > 0 && (
        <PhotoCarousel label="Awarded" photographs={awarded} revealColourOnHover />
      )}
      {personal.length > 0 && <PhotoCarousel label="Personal Work" photographs={personal} />}
    </div>
  );
}
