# React + Redux Dynamic Form Builder

This is an applicationn that allows users to create, preview, and manage custom web forms without writing any code. All form configurations are persisted in the browser's local storage.

**Live Demo:** [https://formbuilderassignment.netlify.app/](https://formbuilderassignment.netlify.app/)

---

## Features

- **Dynamic Field Creation:** Add various field types like text, number, select, radio, checkbox, and date.
- **Rich Configuration:** Configure labels, placeholders, default values, and required status for each field.
- **Advanced Validation:** Add custom validation rules such as minimum/maximum length, email format, and password policies.
- **Drag-and-Drop:** Easily reorder fields on the form canvas.
- **Live Preview:** Instantly preview the form as an end-user would see it, with full interactivity and validation.
- **Persistent Storage:** All created form schemas are saved to `localStorage`, so your work is never lost.

---

## Tech Stack

- **Frontend:** React 18, TypeScript
- **State Management:** Redux Toolkit
- **UI Library:** Material-UI (MUI)
- **Form Handling (Preview):** React Hook Form
- **Routing:** React Router v6
- **Deployment:** Netlify

---

## Running the Project Locally

1.  Clone the repository:
    ```bash
    git clone "link"
    ```
2.  Navigate into the project directory:
    ```bash
    cd react-redux-form-builder
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
