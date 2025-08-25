import { FormStore } from "../state-service.js";

export const submitForm = (t: FormStore) => {
    t.resources.isSubmitting = true;
    
    // Simulate form submission
    setTimeout(() => {
        t.resources.isSubmitting = false;
        console.log("Form submitted:", t.resources.formData);
    }, 1000);
};
