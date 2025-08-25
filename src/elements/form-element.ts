import { FormElement } from "../form-element.js";
import { css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { useObservableValues } from "@adobe/data/lit";
import "./form-field";
import "./form-submit";

@customElement("form-element")
export class FormElementComponent extends FormElement {
    static override styles = css`
        .form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        
        .form-section {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .form-section-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: #333;
            margin: 0;
        }
    `;

    protected override render() {
        const values = useObservableValues(() => ({
            formData: this.service.state.observe.formData,
            isSubmitting: this.service.state.observe.isSubmitting,
        }));

        if (!values) return;

        return html`
            <form class="form" @submit=${(e: Event) => {
                e.preventDefault();
                this.service.state.database.transactions.submitForm();
            }}>
                <div class="form-section">
                    <h3 class="form-section-title">Advanced Information</h3>
                    <form-field 
                        label="Title" 
                        name="title"
                        .value=${values.formData.title}
                        @input=${(e: Event) => {
                            const target = e.target as HTMLInputElement;
                            this.service.state.database.transactions.updateField("title", target.value);
                        }}
                    ></form-field>
                    
                    <form-field 
                        label="Author" 
                        name="author"
                        .value=${values.formData.author}
                        @input=${(e: Event) => {
                            const target = e.target as HTMLInputElement;
                            this.service.state.database.transactions.updateField("author", target.value);
                        }}
                    ></form-field>
                    
                    <form-field 
                        label="Category" 
                        name="category"
                        .value=${values.formData.category}
                        @input=${(e: Event) => {
                            const target = e.target as HTMLInputElement;
                            this.service.state.database.transactions.updateField("category", target.value);
                        }}
                    ></form-field>
                </div>
                
                <div class="form-section">
                    <h3 class="form-section-title">Content</h3>
                    <form-field 
                        label="Content" 
                        name="content"
                        type="textarea"
                        .value=${values.formData.content}
                        @input=${(e: Event) => {
                            const target = e.target as HTMLTextAreaElement;
                            this.service.state.database.transactions.updateField("content", target.value);
                        }}
                    ></form-field>
                </div>
                
                <form-submit 
                    .isSubmitting=${values.isSubmitting}
                ></form-submit>
            </form>
        `;
    }
}
