import { FormStore } from "../state-service.js";

export const resetForm = (t: FormStore) => {
    t.resources.formData = {
        title: "",
        content: "",
        author: "",
        category: ""
    };
    t.resources.isSubmitting = false;
    t.resources.isValid = false;
};
