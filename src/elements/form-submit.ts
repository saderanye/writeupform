import { FormElement } from "../form-element.js";
import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("form-submit")
export class FormSubmitElement extends FormElement {
    static override styles = css`
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

    @property({ type: Boolean })
    isSubmitting = false;

    protected override render() {
        return html`
            <div class="submit-container">
                <button 
                    type="button" 
                    class="reset-button"
                    @click=${() => this.service.state.database.transactions.resetForm()}
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
        `;
    }
}
