
# University Admission Quiz

[![Powered by Gemini](https://img.shields.io/badge/Powered%20by-Gemini%20API-4285F4?style=for-the-badge&logo=google-gemini)](https://ai.google.dev/)

An endless quiz application designed to help students prepare for university admission tests in Bangladesh, such as the Dhaka University (DU) entrance exam. It leverages the Google Gemini API to dynamically generate a continuous stream of relevant multiple-choice questions.

![University Admission Quiz Screenshot](https://storage.googleapis.com/genai-assets/github-repo/bangla-quiz.png)


## ✨ Features

-   **Endless Quiz Mode**: Never run out of questions. The app fetches more as you go.
-   **Dynamic Question Generation**: Powered by the Google Gemini API for a wide variety of questions.
-   **Targeted Content**: Questions are specifically tailored for DU admission tests (B & D units), covering Bangla, English, and General Knowledge.
-   **Real-time Scoring**: Track your score as you answer questions.
-   **Responsive Design**: A seamless experience on both desktop and mobile devices.
-   **Sleek UI**: A clean, modern, and intuitive user interface built with Tailwind CSS.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

-   A modern web browser
-   A Google Gemini API Key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).
-   Node.js (for using `npx`) or Python (for using the built-in HTTP server).

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd your-repo-name
    ```

3.  **Set up your API Key:**
    This project requires a Google Gemini API key to function. The application is configured to load the key from an environment variable.

    -   Create a file named `.env` in the root of the project directory.
    -   Add the following line to the `.env` file, replacing `YOUR_API_KEY_HERE` with your actual key:
        ```
        API_KEY=YOUR_API_KEY_HERE
        ```
    > **Security Note**: The `.env` file is included in `.gitignore` to prevent you from accidentally committing your secret API key to a public repository.

4.  **Serve the files:**
    Since this project uses modern ES modules and doesn't require a complex build step, you can run it with any simple local web server.

    -   **Using Node.js:**
        ```sh
        npx serve .
        ```
    -   **Using Python:**
        ```sh
        # For Python 3
        python -m http.server
        ```

5.  **View the app:**
    Open your browser and navigate to the local server address provided by the command (e.g., `http://localhost:3000` or `http://localhost:8000`).

## 🛠️ Technologies Used

-   **Frontend**: React 19, TypeScript
-   **AI**: Google Gemini API (`@google/genai`)
-   **Styling**: Tailwind CSS (via CDN)
-   **Module Loading**: Modern ES Modules via `esm.sh`

## 📂 Project Structure

```
.
├── components/         # Reusable React components
│   ├── QuizCard.tsx
│   ├── LoadingSpinner.tsx
│   └── StartScreen.tsx
├── services/           # API interaction logic
│   └── geminiService.ts
├── App.tsx             # Main application component
├── index.html          # HTML entry point
├── index.tsx           # React root renderer
├── types.ts            # Shared TypeScript types
├── README.md           # You are here!
└── .gitignore          # Files to be ignored by Git
```

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
