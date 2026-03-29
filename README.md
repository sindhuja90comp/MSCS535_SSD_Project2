# MSCS535 Secure Software Design - Project 2

## Overview

This project demonstrates common JavaScript web security issues and their mitigations using a small Express application.
It includes intentionally vulnerable routes and corresponding secure routes so the behavior can be compared side by side.

The project covers the following assignment requirements:

1. JavaScript code injection via web applications using reflected XSS
2. Dynamic evaluation of code at runtime using `eval()`
3. Mitigations for both vulnerabilities using output encoding, safer evaluation logic, and Content Security Policy (CSP)

## Technologies Used

- Node.js
- Express
- Helmet

## Project Structure

- `src/server.js` - application entry point and CSP configuration
- `src/routes/vulnerableRoutes.js` - intentionally vulnerable XSS and `eval()` examples
- `src/routes/secureRoutes.js` - mitigated versions of the vulnerable routes
- `src/utils/htmlEscape.js` - helper used to escape HTML output
- `src/utils/safeMathEvaluator.js` - safe arithmetic parser used instead of dynamic code execution
- `public/style.css` - basic styling for the demo pages

## Vulnerabilities Demonstrated

### 1. Code Injection via Web Applications

The route `/vulnerable/xss` reflects user input directly into the HTML response:

- Example: `/vulnerable/xss?name=<script>alert('XSS')</script>`
- Risk: an attacker can inject malicious JavaScript into the page
- File: `src/routes/vulnerableRoutes.js`

This demonstrates reflected Cross-Site Scripting (XSS).

### 2. Dynamic Evaluation at Runtime

The route `/vulnerable/eval` passes user input directly into JavaScript `eval()`:

- Example: `/vulnerable/eval?expression=2+%2B+2`
- Risk: attacker-controlled input can be executed as code
- File: `src/routes/vulnerableRoutes.js`

This demonstrates unsafe runtime code evaluation in an interpreted language.

## Mitigations Implemented

### 1. XSS Mitigation

The route `/secure/xss` protects against XSS by escaping user input before rendering it into the page.

- Helper file: `src/utils/htmlEscape.js`
- Secure route file: `src/routes/secureRoutes.js`
- Result: script tags and other HTML characters are rendered as text instead of being executed

### 2. Content Security Policy

The project applies CSP headers to secure routes using Helmet middleware.

- Configured in: `src/server.js`
- Applied to: `/secure/*`
- Purpose: restricts script execution and adds another layer of protection against injected content

### 3. Safe Alternative to Dynamic Evaluation

The secure evaluation route does not use `eval()` or `Function()`.
Instead, it uses a small parser that accepts only arithmetic expressions made of:

- numbers
- parentheses
- `+`, `-`, `*`, `/`

If unsafe input or unsupported syntax is provided, the request is rejected.

## How to Run the Project

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

3. Open the application in a browser:

```text
http://localhost:3000
```

## Demo Routes

### Vulnerable Routes

- `/vulnerable/xss?name=Guest`
- `/vulnerable/eval?expression=2+%2B+2`

### Secure Routes

- `/secure/xss?name=Guest`
- `/secure/eval?expression=2+%2B+2`

## Rubric Coverage

### Code Injection via Web Applications - 20%

Implemented through the vulnerable reflected XSS route and its secure counterpart.

### Interpreted Languages Features for Dynamic Evaluation - 50%

Implemented through the vulnerable `eval()` route and mitigated through a safe parser-based evaluator.

### Mitigating XSS and Implementing Content Security Policy - 30%

Implemented through HTML escaping, secure rendering, and CSP headers on secure routes.

## Conclusion

This project fully demonstrates both required vulnerabilities and their mitigations.
It shows how JavaScript web applications can be exploited through XSS and dynamic code execution, and how those risks can be reduced through secure coding practices and browser-enforced policies.
