# ReguAI

ReguAI-App is a React App. It is nested within the ReguAI repo with other files outside containing backend references.

## 📁 Project Structure

```
ReguAI-App/
├── public/                # Static assets
├── src/                  # React source code
│   ├── components/
|   |  ├── ChatbotIcon.jsx # Chatbot icon
|   |  ├── ChatForm.jsx # Handling user message submission
|   |  ├── ChatMessage.jsx # Chat message template
│   ├── App.jsx # Main page that user lands on
│   ├── index.css # Styling
│   ├── main.jsx # Renders App
├── index.html            # Main HTML template
├── package.json          # Project metadata and dependencies
├── vite.config.js        # Vite configuration
└── .gitignore
```

## 🚀 How to run:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ReguAI.git
cd ReguAI
cd ReguAI-App
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

This will start the app at `http://localhost:5173` (or a different port if 5173 is in use).

## 🛠 Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- JavaScript
- CSS
