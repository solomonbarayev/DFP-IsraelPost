export interface FormDocumentsState{
    forms: {
        [key: string]: {
            documents: FormDocument[];
        };
    };
}

export interface FormDocument{
    documentId: string;
    documentTitle: string;
    documentName: string;
    documentType: string;
    uploadDate: string;
    documentBase64: string;
    documentCategory: string;
    itemId?: string | null;
}