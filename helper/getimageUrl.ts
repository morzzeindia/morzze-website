export function getImageUrl(image: string) {
    if (image.startsWith("https")) {
        return image;
    }
    return `https://av-morzze.s3.ap-south-1.amazonaws.com/${image}`;
}   