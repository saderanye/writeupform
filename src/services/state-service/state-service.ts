import { createFormStateService, FormStore } from "./create-state-service.js";

// Form field types
export type FormField = {
    name: string;
    value: string;
    isValid: boolean;
    errorMessage?: string;
};

export type FormData = {
    title: string;
    content: string;
    author: string;
    category: string;
};

export { createFormStateService, createFormStore, createFormDatabase } from "./create-state-service.js";
export type { FormStore, FormReadonlyStore } from "./create-state-service.js";
export type FormStateService = ReturnType<typeof createFormStateService>;
