import { createStore, createDatabase, observeDependentValue, ToReadonlyStore } from "@adobe/data/ecs";
import * as transactions from "./transactions/index.js";
import { FormData } from "./state-service.js";

export function createFormStore() {
    return createStore({} as const, {
        formData: { 
            default: {
                title: "",
                content: "",
                author: "",
                category: ""
            } as FormData 
        },
        isSubmitting: { default: false },
        isValid: { default: false },
    } as const)
}

export type FormStore = ReturnType<typeof createFormStore>;
export type FormReadonlyStore = ToReadonlyStore<FormStore>;

export function createFormDatabase() {
    return createDatabase(
        createFormStore(),
        transactions
    );
}

export function createFormStateService() {
    const database = createFormDatabase();
    return {
        database,
        observe: {
            formData: database.observe.resources.formData,
            isSubmitting: database.observe.resources.isSubmitting,
            isValid: database.observe.resources.isValid,
        }
    }
}
