// Main entry point for the Write Up Form application
import "./form-main-element.js";

// Get the app container
const app = document.getElementById('app');

if (app) {
    app.innerHTML = `
        <form-main-element></form-main-element>
    `;
}

