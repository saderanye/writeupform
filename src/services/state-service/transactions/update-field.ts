import { mutableClone } from "@adobe/data";
import { FormStore, FormData } from "../state-service.js";

export const updateField = (t: FormStore, field: keyof FormData, value: string) => {
    const formData = mutableClone(t.resources.formData);
    formData[field] = value;
    t.resources.formData = formData;
};
