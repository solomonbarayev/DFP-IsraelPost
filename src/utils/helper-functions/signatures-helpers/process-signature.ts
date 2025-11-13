
import trimCanvas from "trim-canvas";

export const processSignature = (canvas: HTMLCanvasElement, maxHeight = 235) => {
  if (!canvas) return "";

  // Create a temporary canvas with transparent background
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  const tempContext = tempCanvas.getContext("2d");

  // Clear the temporary canvas with transparent background
  tempContext!.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

  // Draw the original canvas content
  tempContext!.drawImage(canvas, 0, 0);

  // Trim the temporary canvas
  const trimmedCanvas = trimCanvas(tempCanvas);

  return tempCanvas.toDataURL("image/png");
};
