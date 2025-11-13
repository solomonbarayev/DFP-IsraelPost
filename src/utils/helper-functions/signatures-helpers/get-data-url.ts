import type { RefObject } from "react";
import type { SignaturePad } from "@/types/signature-pad";

export const getSignatureDataUrl = (sigRef: RefObject<SignaturePad | null>) => {
  return sigRef.current ? sigRef.current.toDataURL() : "";
};
