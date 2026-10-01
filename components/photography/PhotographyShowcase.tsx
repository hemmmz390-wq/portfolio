import { Photograph } from "@/lib/types";
import { AwardedPhotos } from "@/components/photography/AwardedPhotos";
import { PhotoGallery } from "@/components/photography/PhotoGallery";

interface PhotographyShowcaseProps {
  photographs: Photograph[];
}

/** Award-winning frames lead, then the rest of the work as a spread. */
export function PhotographyShowcase({ photographs }: PhotographyShowcaseProps) {
  const awarded = photographs.filter((photo) => photo.award);
  const rest = photographs.filter((photo) => !photo.award);

  return (
    <>
      {awarded.length > 0 && (
        <section aria-labelledby="photography-awarded">
          <h3
            id="photography-awarded"
            className="mb-6 font-body text-[10px] uppercase tracking-[0.3em] text-muted"
          >
            Awarded
          </h3>
          <AwardedPhotos photographs={awarded} />
        </section>
      )}

      {rest.length > 0 && (
        <div className={awarded.length > 0 ? "mt-24" : undefined}>
          <PhotoGallery photographs={rest} />
        </div>
      )}
    </>
  );
}
