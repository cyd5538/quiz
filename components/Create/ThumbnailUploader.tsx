import React from 'react';
import ImageDropZone from '@/components/Create/ImageDropZone';
import ThumbnailPreview from '@/components/Create/ThumbnailPreview';
import { Label } from '@/components/ui/label';

interface Props {
  thumbnail: File | null;
  thumbnailPreview: string | null;
  showDropZone: boolean;
  handleFileUpload: (file: File) => void;
  clearThumbnail: () => void;
}

const ThumbnailUploader: React.FC<Props> = ({
  thumbnail,
  thumbnailPreview,
  showDropZone,
  handleFileUpload,
  clearThumbnail,
}) => (
  <div>
    <Label className="text-sm font-medium text-gray-700 block mb-2">Thumbnail</Label>
    {showDropZone ? (
      <ImageDropZone onFileUploaded={handleFileUpload} />
    ) : (
      thumbnailPreview && (
        <ThumbnailPreview
          thumbnail={thumbnail}
          thumbnailPreview={thumbnailPreview}
          clearThumbnail={clearThumbnail}
        />
      )
    )}
  </div>
);

export default ThumbnailUploader;
