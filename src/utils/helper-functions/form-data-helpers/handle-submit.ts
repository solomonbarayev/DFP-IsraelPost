import type { SignaturePad } from "@/types/signature-pad";
import focusErrorField from "./focus-error-field";
import type { FormData } from "@/types/form-data";

interface HandleSubmitProps {
  e: React.FormEvent<HTMLFormElement>;
  validationModule: any;
  currentStep: number;
  formData: Record<string, any>;
  documents: any;
  dispatch: any;
  formId: string;
  validateStep: (payload: { formId: string; step: number; validationResult: any }) => void;
  setFormSubmitted: (payload: { formId: string; isSubmitted: boolean }) => void;
  prepareSubmitData: (payload: { formData: Record<string, any>; documents: any; formId: string; sigRef: React.RefObject<SignaturePad | null>; formState: FormData }) => any;
  setSendingEntry: (payload: boolean) => void;
  sendFormData: (payload: { submitData: any }) => Promise<void>;
  sigRef: React.RefObject<SignaturePad | null>;
  formState: FormData;
}

export const handleSubmit = ({
  e,
  validationModule,
  currentStep,
  formData,
  documents,
  dispatch,
  formId,
  validateStep,
  setFormSubmitted,
  prepareSubmitData,
  setSendingEntry,
  sendFormData,
  sigRef,
  formState,
}: HandleSubmitProps) => {
  e.preventDefault();

  // Run validation
  //   const result = runEnhancedValidation(validationModule, currentStep, formData, documents, undefined, accountFeaturesData);
  const result = validationModule.validateStep(currentStep, formData, documents);

  // Store validation result in Redux
  dispatch(
    validateStep({
      formId,
      step: currentStep,
      validationResult: result,
    })
  );

  // Check if form is valid
  if (result.isValid()) {
    dispatch(setFormSubmitted({ formId, isSubmitted: true }));
    const submitData = prepareSubmitData({ formData, documents, formId, sigRef, formState });

    dispatch(setSendingEntry(true));
    sendFormData(submitData).finally(() => dispatch(setSendingEntry(false)));
  } else {
    const firstErrorField = Object.keys(result.getErrors())[0];
    if (firstErrorField) {
      focusErrorField(firstErrorField);
    }
  }
};
