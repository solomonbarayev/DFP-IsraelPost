import { processSignature } from "../signatures-helpers/process-signature";
import type { SignaturePad } from "@/types/signature-pad";
import type { FormDocument } from "@/types/forms-documents";
import type { FormData } from "@/types/form-data";

interface PrepareSubmitDataProps {
  formData: FormData;
  documents: FormDocument[];
  formId: string;
  sigRef: React.RefObject<SignaturePad | null>;
  formState: FormData;
}


export const prepareSubmitData = ({ formData, documents, formId, sigRef, formState }: PrepareSubmitDataProps) => {

  const payerDetails = formData.data.payerDetails
    ? {
        ...formData.data.payerDetails,
        signature:
          sigRef.current && formData.data.payerDetails.signature
            ? processSignature(sigRef.current.getCanvas())
            : formData.data.payerDetails.signature,
      }
    : null;

  return {
    formId: parseInt(formId),
    formNumber: formState?.formNumber || null,
    formData: {
      ...formData,
      payerDetails,
    },
    documents:
      documents && documents.length > 0
        ? documents
        : [
            {
              documentId: 1,
              documentName: "",
              documentType: "",
              uploadDate: "",
              documentBase64: "",
            },
          ],
  };
};
