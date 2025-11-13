import updateNestedField from "./update-nested-field";

interface HandleChangeProps {
  field: string;
  value: string | number | boolean | object | null | undefined;
  toValidate: boolean;
  formData: Record<string, any>;
  validationModule: any;
  currentStep: number;
  dispatch: any;
  formId: string;
  validateStep: (payload: { formId: string; step: number; validationResult: any }) => void;
  updateField: (payload: { formId: string; field: string; value: any }) => void;
}


export const handleChange = ({
  field,
  value,
  toValidate = true,
  formData,
  validationModule,
  currentStep,
  dispatch,
  formId,
  validateStep,
  updateField,
}: HandleChangeProps) => {
  if (toValidate) {
    const updatedFormData = updateNestedField(formData, field, value);

    const result = validationModule.validateStep(currentStep, updatedFormData, field);
    dispatch(
      validateStep({
        formId,
        step: currentStep,
        validationResult: result,
      })
    );
  }

  dispatch(updateField({ formId, field, value }));
};
