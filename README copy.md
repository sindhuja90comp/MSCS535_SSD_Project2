# Project 2: Secure Software Design (Chapters 5–8)

This project demonstrates:
1. Code injection via web applications using a simple reflected XSS example.
2. Dynamic evaluation of code at runtime using `eval()` in JavaScript.
3. Mitigations for both issues using output encoding, safe input handling, and Content Security Policy (CSP).

## Tech Stack
- Node.js
- Express
- Helmet

## Project Structure
- `src/server.js` - main app entry point
- `src/routes/vulnerableRoutes.js` - intentionally vulnerable routes
- `src/routes/secureRoutes.js` - mitigated routes
- `src/utils/htmlEscape.js` - output encoding helper
- `src/utils/safeMathEvaluator.js` - restricted arithmetic evaluator
- `public/style.css` - basic styling

## Install
```bash
npm install
```

## Run
```bash
npm start
```

Open:
`http://localhost:3000`

## Routes
- `/vulnerable/xss?name=YOUR_INPUT`
- `/vulnerable/eval?expression=YOUR_INPUT`
- `/secure/xss?name=YOUR_INPUT`
- `/secure/eval?expression=YOUR_INPUT`

## Suggested demo inputs
Reflected XSS:
`<script>alert("XSS")</script>`

Safe math:
`2 + 2`

## Submission note
Run the project locally and capture:
- terminal output showing the server start
- browser screenshots showing vulnerable behavior
- browser screenshots showing the mitigated behavior

Those outputs/screenshots should be supplied before the final report is drafted.
