import React from "react";
import Image from "next/image";

interface ThumbnailPreviewProps {
  thumbnail: File | null;
  thumbnailPreview: string;
  clearThumbnail: () => void;
}

const ThumbnailPreview: React.FC<ThumbnailPreviewProps> = ({
  thumbnail,
  thumbnailPreview,
  clearThumbnail,
}) => (
  <div className="mt-2 relative">
    <Image
      src={thumbnailPreview}
      alt="Thumbnail Preview"
      width="200"
      height="200"
      className="object-cover rounded-md border border-gray-300 cursor-pointer m-auto"
      onClick={clearThumbnail}
    />
  </div>
);

export default ThumbnailPreview;
