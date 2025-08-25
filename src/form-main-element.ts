import { ServiceApplication, withHooks } from "@adobe/data/lit";
import { MainService } from "./services/main-service/main-service.js";
import { createMainService } from "./services/main-service/create-main-service.js";
import { customElement } from "lit/decorators.js";
import { html, css } from "lit";
import "./elements/index.js";

@customElement("form-main-element")
export class FormMainElement extends ServiceApplication<MainService> {
    static override styles = css`
        .form-container {
            max-width: 800px;
            margin: 2rem auto;
            padding: 2rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .form-header {
            text-align: center;
            margin-bottom: 2rem;
            color: #333;
        }
        
        .form-title {
            font-size: 2rem;
            margin: 0 0 0.5rem 0;
            color: #1976d2;
        }
        
        .form-subtitle {
            font-size: 1rem;
            margin: 0;
            color: #666;
        }
    `;

    protected override async createService(): Promise<MainService> {
        return createMainService();
    }

    @withHooks
    override render() {
        if (!this.service) {
            return html`<div>Loading...</div>`;
        }
        return html`
            <div class="form-container">
                <div class="form-header">
                    <h1 class="form-title">Write Up Form</h1>
                    <p class="form-subtitle">Complete the form below to submit your write-up</p>
                </div>
                <form-element></form-element>
            </div>
        `;
    }
}
