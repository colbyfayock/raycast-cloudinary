import { getImageUrl } from "./cloudinary";
import type { Asset } from "../types/asset";

/**
 * getUploadSuccessItems
 */

export function getUploadSuccessItems(asset: Asset) {
  if (typeof asset.public_id !== "string") {
    throw new Error("Failed to get items: Invalid Asset.");
  }

  const optimizedUrl = getImageUrl(asset.public_id, {
    quality: "auto",
    fetch_format: "auto",
  });

  const ratioUrls = ["16:9", "4:3", "3:2", "1:1", "2:3", "3:4", "9:16"].map((ratio) => {
    const ratioUrl = getImageUrl(asset.public_id, {
      aspect_ratio: ratio,
      crop: "fill",
      quality: "auto",
      fetch_format: "auto",
    });
    return {
      title: `Resized to ${ratio}`,
      icon: "url.png",
      assetUrl: ratioUrl,
      previewUrl: ratioUrl,
      detail: `![Uploaded Image ${ratio}](${ratioUrl})`,
    };
  });

  return [
    {
      title: "Optimized",
      icon: "url.png",
      assetUrl: optimizedUrl,
      previewUrl: optimizedUrl,
      detail: `![Uploaded Image Optimized](${optimizedUrl})`,
    },
    {
      title: "Raw",
      icon: "url.png",
      assetUrl: asset.secure_url,
      previewUrl: optimizedUrl,
      detail: `![Uploaded Image Raw](${optimizedUrl})`,
    },
    ...ratioUrls,
  ];
}
