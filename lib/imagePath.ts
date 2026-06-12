const KNOWN_IMAGE_HOSTS = new Set([
  "av-morzze.s3.ap-south-1.amazonaws.com",
  "d2icu6klh68l1z.cloudfront.net",
]);

export function getStoredImageKey(image: string | null | undefined) {
  if (!image) return "";

  if (image.startsWith("blob:") || image.startsWith("data:")) {
    return image;
  }

  if (image.startsWith("http")) {
    try {
      const url = new URL(image);

      if (KNOWN_IMAGE_HOSTS.has(url.hostname)) {
        return url.pathname.replace(/^\/+/, "");
      }
    } catch {
      return image;
    }
  }

  return image.replace(/^\/+/, "");
}
