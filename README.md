# Auto-Marketer Pipeline 🎯

The **Auto-Marketer Pipeline** is a production-ready AI marketing campaign builder. When a user provides any website URL, the pipeline scrapes the content, structures the brand theme, writes an optimized 2-sentence marketing ad caption using **Groq LLM**, creates a highly detailed creative prompt, and renders a visual marketing banner using the **Hugging Face Inference API**.

---

## 🚀 Key Features

*   **Robust Cheerio Scraper**: Cleans styles/scripts noise, handles encoding, and automatically extracts structural semantic text (Title, Meta description, Core body).
*   **Intelligent Copywriting Chain**: Connects Groq LLMs in series to generate marketing copies followed by descriptive, brand-aligned visual prompts (excluding bad text rendering).
*   **Hugging Face Image Generation**: Generates high-fidelity visual banners aligned with the branding, supporting custom model configurations.
*   **Resilient Fallback Mode**: 
    *   If scraping is blocked, it recovers using page metadata and domain name heuristics to feed the LLM.
    *   If the Hugging Face API is rate-limited or fails, the pipeline finishes gracefully and displays the copy and prompt so they can be exported.
*   **Next-Gen Web UI**: Built with React and Tailwind CSS v4, containing a clean glassmorphic theme, micro-animations, copy-to-clipboard functionality, and a real-time campaign progress tracker.

---

## 📁 Project Directory Structure

```
auto-marketer-pipeline/
├── backend/
│   ├── server.js                  # Express Server (mounts routes, serves static assets)
│   ├── .env                       # API Credentials & Config (git ignored)
│   ├── .env.example               # Reference environment settings
│   ├── package.json               # Backend Node dependencies
│   ├── outputs/                   # Output storage folder for campaign files
│   ├── routes/
│   │   └── pipeline.js            # Unified pipeline coordinator route
│   └── services/
│       ├── scraper.js             # Cheerio web scraper with fallback recovery
│       ├── groqService.js         # Groq LLM client (Copywriting & Prompts)
│       └── imageService.js        # HF Image generation & output saver
└── frontend/
    ├── index.html                 # Entry web template
    ├── package.json               # Frontend Node dependencies
    ├── vite.config.js             # Vite configuration with API developer proxy
    └── src/
        ├── main.jsx               # React entry scripts
        ├── index.css              # Custom styling & Tailwind directives
        ├── App.jsx                # Main Dashboard View and workflow manager
        ├── components/
        │   ├── Header.jsx         # Hero Header & status checker
        │   ├── ProgressTracker.jsx# Animated progressive stepper
        │   ├── PreviewSection.jsx # Webpage scrape inspector pane
        │   └── CampaignResult.jsx # Copywriter and ad output panel
        └── services/
            └── api.js             # Axios client for pipeline endpoints
```

---

## 🛠️ Installation & Local Setup

### Prerequisites
*   Node.js (v18 or higher recommended)
*   npm

### 1. Configure backend keys
1.  Navigate into the `backend` folder:
    ```bash
    cd backend
    ```
2.  Create your `.env` configuration:
    ```bash
    copy .env.example .env
    ```
3.  Open `.env` and fill in your API credentials:
    *   **GROQ_API_KEY**: Get a free API key at [Groq Console](https://console.groq.com/).
    *   **HF_API_KEY**: Get a free user access token at [Hugging Face Settings](https://huggingface.co/settings/tokens).
    *   **HF_MODEL** (Optional): Defaults to `black-forest-labs/FLUX.1-schnell` for lightning-fast high-quality generation. You can change this to `stabilityai/stable-diffusion-xl-base-1.0` if preferred.

---

### 2. Start the Backend Server
From the `backend` directory, run:
```bash
# Start in development auto-reload mode
npm run dev

# Or start standard mode
npm start
```
The server starts at `http://localhost:5000`. You can check server health at `http://localhost:5000/health`.

---

### 3. Start the Frontend Client
1.  Open a new terminal window at the root of the project and navigate into the `frontend` folder:
    ```bash
    cd frontend
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```
The client dashboard opens at `http://localhost:5173`. The Vite server is configured to proxy all API requests to the backend server automatically, eliminating CORS configurations during development.

---

## 🛡️ Error & Fallback Scenarios Checked

1.  **URL Validation**: Both client-side and server-side validate URL formatting before executing scraper requests.
2.  **Scraping Failures**: If a page returns an error (403, 404, DNS failure, CAPTCHA block), the pipeline continues. It infers company profiles and business category prompts based on the URL's hostname and title elements.
3.  **Image Generator Unavailable**: If Hugging Face returns a loading state (503) or rate limits, the UI alerts the user, shows the completed marketing copy, and presents the image prompt with a copy button for use elsewhere.
4.  **Local Logging and File Outputs**: The generated materials are written to files inside `backend/outputs/` directory dynamically using timestamp hashes to avoid conflicts in multi-session environments.
