import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("form-field")
export class FormFieldElement extends LitElement {
    static override styles = css`
        .field-container {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .field-label {
            font-weight: 500;
            color: #333;
            font-size: 0.9rem;
        }
        
        .field-input {
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
            transition: border-color 0.2s;
        }
        
        .field-input:focus {
            outline: none;
            border-color: #1976d2;
            box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
        }
        
        .field-textarea {
            min-height: 120px;
            resize: vertical;
        }
        
        .field-error {
            color: #d32f2f;
            font-size: 0.8rem;
            margin-top: 0.25rem;
        }
    `;

    @property({ type: String })
    label = "";

    @property({ type: String })
    name = "";

    @property({ type: String })
    value = "";

    @property({ type: String })
    type: "text" | "email" | "password" | "number" = "text";

    @property({ type: Boolean })
    isTextarea = false;

    @property({ type: String })
    placeholder = "";

    @property({ type: Boolean })
    required = false;

    override render() {
        return html`
            <div class="field-container">
                <label class="field-label" for=${this.name}>
                    ${this.label}${this.required ? " *" : ""}
                </label>
                
                ${this.isTextarea 
                    ? html`
                        <textarea
                            id=${this.name}
                            name=${this.name}
                            class="field-input field-textarea"
                            placeholder=${this.placeholder}
                            ?required=${this.required}
                            .value=${this.value}
                            @input=${(e: Event) => {
                                const target = e.target as HTMLTextAreaElement;
                                this.dispatchEvent(new CustomEvent('input', {
                                    detail: { value: target.value },
                                    bubbles: true,
                                    composed: true
                                }));
                            }}
                        ></textarea>
                    `
                    : html`
                        <input
                            id=${this.name}
                            name=${this.name}
                            type=${this.type}
                            class="field-input"
                            placeholder=${this.placeholder}
                            ?required=${this.required}
                            .value=${this.value}
                            @input=${(e: Event) => {
                                const target = e.target as HTMLInputElement;
                                this.dispatchEvent(new CustomEvent('input', {
                                    detail: { value: target.value },
                                    bubbles: true,
                                    composed: true
                                }));
                            }}
                        />
                    `
                }
            </div>
        `;
    }
}
