import focusErrorField from "./focus-error-field";

export  const handleStepValidation = ({
  step,
  validationModule,
  formData,
  documents,
  dispatch,
  formId,
  validateStep,
}: {
  step: number;
  validationModule: any;
  formData: any;
  documents: any;
  dispatch: any;
  formId: string;
  validateStep: (payload: { formId: string; step: number; validationResult: any }) => void;
}) => {
  if (!validationModule?.validateStep) {
    return { isValid: () => true, getErrors: () => ({}) };
  }

  const result = validationModule.validateStep(step, { formData, documents });

  dispatch(
    validateStep({
      formId,
      step,
      validationResult: result,
    })
  );

  if (!result.isValid()) {
    const firstErrorField = Object.keys(result.getErrors())[0];
    focusErrorField(firstErrorField);
  }

  return result;
};