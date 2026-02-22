import Image from 'next/image';
import { galleryImages } from '@/data/site-content';

export function PhotoGallery() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {galleryImages.map((image) => (
        <div key={image.src} className="relative aspect-square overflow-hidden rounded-xl">
          <Image src={image.src} alt={image.alt} fill className="object-cover" loading="lazy" sizes="(max-width: 640px) 50vw, 25vw" />
        </div>
      ))}
    </div>
  );
}
