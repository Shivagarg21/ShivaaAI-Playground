An interactive AI interface inspired by leading LLM platforms, built with a focus on prompt engineering, model comparison, and UI/UX polish. Designed for developers and researchers to experiment with generative AI workflows in a clean, accessible environment.

🔗 **Live Demo**: [Vercel Deployment](https://vercel.com/gargshivam059-4017s-projects/v0-ai-playground-interface/Fc9KDcXU1c9RXuMvrFLfzoWgRhBZ)

---

## 📚 1. Research

### 🔍 Platforms Reviewed
- **OpenAI Playground** – granular control over model parameters, clean layout
- **Hugging Face Spaces** – community-driven demos, flexible UI
- **Anthropic Console** – role-based prompt structure, minimal design
- **Copilot Lab (UI hosted)** – conversational UX, markdown formatting
- **Perplexity AI** – search-integrated LLM responses, fast UX

### 💡 Key Features Selected (6–8)
- Model selector with dropdown
- Prompt editor with save/load templates
- Parameters panel (temperature, max tokens)
- Chat/output area with copy & download JSON
- Token usage display
- Theme toggle (light/dark)
- Role-based message formatting
- Responsive, keyboard-accessible UI

---

## 🎨 2. Design

### 🖼️ Mockup
- Prototyped in **Figma** with Tailwind spacing tokens
- Typography mapped to Tailwind’s modular scale
- Layout inspired by ChatGPT and Anthropic Console

### ♿ Accessibility Features
- ARIA labels on interactive components
- Keyboard-navigable buttons, sliders, and dropdowns
- Focus states and hover animations via Tailwind + Framer Motion

---

## 🛠️ 3. Development

### 🧩 Tech Stack
- **Frontend**: React.js (Vite), TypeScript (strict mode), Tailwind CSS
- **State Management**: Zustand + React Context
- **UI Components**: ShadCN UI, custom ChatBubble, Modal, Slider
- **Backend/API**: Mock API via Next.js routes (`/api/models`, `/api/templates`)
- **Deployment**: Vercel

### 🧪 Core Components
- `ModelSelector.tsx` – dropdown for GPT-3.5, GPT-4, Claude, etc.
- `PromptEditor.tsx` – editable textarea with template save/load
- `ParametersPanel.tsx` – sliders for temperature, max tokens
- `ChatOutput.tsx` – displays prompt/response with copy/download
- `ThemeToggle.tsx` – localStorage-based light/dark switch

### 📁 Storybook
- Setup included in `/storybook`
- Stories written for `Button`, `Slider`, `Modal`, `ChatBubble`

### 📦 Mock API
- Located in `/pages/api/models.ts` and `/pages/api/templates.ts`
- Returns dummy JSON for dropdowns and templates

---
## 🧠 Problem Solved

> Most AI interfaces lack customization, accessibility, and developer-friendly workflows. This playground solves:
- Fast prototyping across multiple models
- Editable prompt templates for reuse
- Token usage tracking for cost awareness
- Clean, responsive UI with accessibility baked in
- Easy extension for new models or backend APIs

---

## 📸 UI Preview

> Sleek, minimal interface with role-based message formatting, token counter, and markdown support.

---


## 👨‍💻 Author

**Shivam Garg**  
Final-year CS student | MERN & ML systems builder  




