import { PhotoGallery } from '@/components/photo-gallery';

export default function GalleryPage() {
  return (
    <section className="section-shell">
      <h1 className="mb-4 text-3xl font-bold">Gallery</h1>
      <PhotoGallery />
    </section>
  );
}
