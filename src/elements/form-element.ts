import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./form-field";

interface FormData {
    companyName: string;
    author: string;
    category: string;
    content: string;
}

@customElement("form-element")
export class FormElementComponent extends LitElement {
    @state()
    private formData: FormData = {
        companyName: "",
        author: "",
        category: "",
        content: ""
    };

    @state()
    private isSubmitting = false;

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

        .submit-container {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid #eee;
        }
        
        .submit-button {
            padding: 0.75rem 2rem;
            background: #1976d2;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .submit-button:hover:not(:disabled) {
            background: #1565c0;
        }
        
        .submit-button:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
        
        .reset-button {
            padding: 0.75rem 2rem;
            background: transparent;
            color: #666;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .reset-button:hover {
            background: #f5f5f5;
            border-color: #ccc;
        }
        
        .loading-spinner {
            display: inline-block;
            width: 1rem;
            height: 1rem;
            border: 2px solid transparent;
            border-top: 2px solid currentColor;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-right: 0.5rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    private updateField(field: keyof FormData, value: string) {
        this.formData = { ...this.formData, [field]: value };
    }

    private async handleSubmit(e: Event) {
        e.preventDefault();
        this.isSubmitting = true;
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log("Form submitted:", this.formData);
        this.isSubmitting = false;
        
        // Reset form after submission
        this.formData = {
            companyName: "RESET",
            author: "",
            category: "",
            content: ""
        };
    }

    private resetForm() {
        this.formData = {
            companyName: "",
            author: "",
            category: "",
            content: ""
        };
    }

    override render() {
        return html`
            <form class="form" @submit=${this.handleSubmit}>
                <div class="form-section">
                    <h3 class="form-section-title">Advanced Information</h3>
                    <form-field 
                        label="Company Name" 
                        name="companyName"
                        .value=${this.formData.companyName}
                        @input=${(e: Event) => {
                            const target = e.target as HTMLInputElement;
                            this.updateField("companyName", target.value);
                        }}
                    ></form-field>
                    
                    <form-field 
                        label="Author" 
                        name="author"
                        .value=${this.formData.author}
                        @input=${(e: Event) => {
                            const target = e.target as HTMLInputElement;
                            this.updateField("author", target.value);
                        }}
                    ></form-field>
                    
                    <form-field 
                        label="Category" 
                        name="category"
                        .value=${this.formData.category}
                        @input=${(e: Event) => {
                            const target = e.target as HTMLInputElement;
                            this.updateField("category", target.value);
                        }}
                    ></form-field>
                </div>
                
                <div class="form-section">
                    <h3 class="form-section-title">Content</h3>
                    <form-field 
                        label="Content" 
                        name="content"
                        .isTextarea=${true}
                        .value=${this.formData.content}
                        @input=${(e: Event) => {
                            const target = e.target as HTMLTextAreaElement;
                            this.updateField("content", target.value);
                        }}
                    ></form-field>
                </div>
                
                <div class="submit-container">
                    <button 
                        type="button" 
                        class="reset-button"
                        @click=${this.resetForm}
                        ?disabled=${this.isSubmitting}
                    >
                        Reset
                    </button>
                    
                    <button 
                        type="submit" 
                        class="submit-button"
                        ?disabled=${this.isSubmitting}
                    >
                        ${this.isSubmitting 
                            ? html`
                                <span class="loading-spinner"></span>
                                Submitting...
                            `
                            : "Submit"
                        }
                    </button>
                </div>
            </form>
        `;
    }
}
