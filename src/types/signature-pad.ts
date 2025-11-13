export interface SignaturePad {
  clear(): void;
  toDataURL(): string;
  getCanvas(): HTMLCanvasElement;
}
