const express = require('express');
const router = express.Router();

router.get('/xss', (req, res) => {
  const name = req.query.name || 'Guest';
  res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" />
  <title>Vulnerable XSS Demo</title><link rel="stylesheet" href="/style.css" /></head><body>
  <div class="container"><div class="card"><h1>Vulnerable XSS Demo</h1>
  <p>This page reflects user input directly into the response.</p>
  <p><strong>Hello, ${name}</strong></p>
  <p><a href="/">Back to home</a></p></div></div></body></html>`);
});

router.get('/eval', (req, res) => {
  const expression = req.query.expression || '2 + 2';
  let result;
  try {
    result = eval(expression);
  } catch (error) {
    result = `Evaluation error: ${error.message}`;
  }
  res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" />
  <title>Vulnerable eval() Demo</title><link rel="stylesheet" href="/style.css" /></head><body>
  <div class="container"><div class="card"><h1>Vulnerable eval() Demo</h1>
  <p>The input below is passed directly into <code>eval()</code>.</p>
  <p><strong>Expression:</strong> ${expression}</p>
  <p><strong>Result:</strong> ${String(result)}</p>
  <p><a href="/">Back to home</a></p></div></div></body></html>`);
});

module.exports = router;
