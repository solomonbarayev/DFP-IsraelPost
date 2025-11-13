
export interface FormData {
  formNumber?: string | null;
  data: Record<string, any>;
  isSubmitted: boolean;
  currentStep: number;
  stepValidation: Record<string, any>;
  numberOfSteps?: number;
}


export interface FormDataState {
    forms: {
        [key: string]: FormData;
    };
    currentFormId: string | null;
    isSendingEntry: boolean;
}


