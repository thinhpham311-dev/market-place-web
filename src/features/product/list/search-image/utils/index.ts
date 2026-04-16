
export async function createAverageHash(imageSrc: string) {
  const image = await loadImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = 8;
  canvas.height = 8;
  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) {
    throw new Error("Canvas context is not available");
  }

  context.drawImage(image, 0, 0, 8, 8);

  const imageData = context.getImageData(0, 0, 8, 8).data;
  const grayscaleValues: number[] = [];

  for (let index = 0; index < imageData.length; index += 4) {
    const red = imageData[index];
    const green = imageData[index + 1];
    const blue = imageData[index + 2];
    grayscaleValues.push(red * 0.299 + green * 0.587 + blue * 0.114);
  }

  const average =
    grayscaleValues.reduce((total, value) => total + value, 0) / grayscaleValues.length;

  return grayscaleValues.map((value) => (value >= average ? "1" : "0")).join("");
}

export async function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();
    image.crossOrigin = "anonymous";
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image"));
    image.src = src;
  });
}

export function getHammingDistance(left: string, right: string) {
  let distance = 0;

  for (let index = 0; index < left.length; index += 1) {
    if (left[index] !== right[index]) {
      distance += 1;
    }
  }

  return distance;
}
