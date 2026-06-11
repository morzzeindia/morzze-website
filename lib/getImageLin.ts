export function getImageURL(image: string | null | undefined) {
    if (!image) return "";
    if (image.startsWith("http") || image.startsWith("blob:") || image.startsWith("data:")) {
        return image;
    }
    return `https://d2icu6klh68l1z.cloudfront.net${image}`;
}
