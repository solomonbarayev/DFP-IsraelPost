import type { RefObject } from "react";
import type { SignaturePad } from "@/types/signature-pad";

export const clearSignature = (sigRef: RefObject<SignaturePad | null>) => {
  if (sigRef.current) {
    sigRef.current.clear();
  }
};