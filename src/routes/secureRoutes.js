const express = require('express');
const htmlEscape = require('../utils/htmlEscape');
const safeMathEvaluator = require('../utils/safeMathEvaluator');
const router = express.Router();

router.get('/xss', (req, res) => {
  const safeName = htmlEscape(req.query.name || 'Guest');
  res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" />
  <title>Secure XSS Demo</title><link rel="stylesheet" href="/style.css" /></head><body>
  <div class="container"><div class="card"><h1>Secure XSS Mitigation Demo</h1>
  <p>User input is HTML-escaped before rendering.</p>
  <p><strong>Hello, ${safeName}</strong></p>
  <p>With CSP enabled, inline script execution is restricted.</p>
  <p><a href="/">Back to home</a></p></div></div></body></html>`);
});

router.get('/eval', (req, res) => {
  const expression = req.query.expression || '2 + 2';
  try {
    const result = safeMathEvaluator(expression);
    res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" />
    <title>Secure Evaluation Demo</title><link rel="stylesheet" href="/style.css" /></head><body>
    <div class="container"><div class="card"><h1>Secure Evaluation Demo</h1>
    <p>The expression is validated and evaluated safely without <code>eval()</code>.</p>
    <p><strong>Expression:</strong> ${htmlEscape(expression)}</p>
    <p><strong>Result:</strong> ${result}</p>
    <p><a href="/">Back to home</a></p></div></div></body></html>`);
  } catch (error) {
    res.status(400).send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" />
    <title>Secure Evaluation Demo</title><link rel="stylesheet" href="/style.css" /></head><body>
    <div class="container"><div class="card"><h1>Secure Evaluation Demo</h1>
    <p>Unsafe input was rejected.</p>
    <p><strong>Expression:</strong> ${htmlEscape(expression)}</p>
    <p><strong>Error:</strong> ${htmlEscape(error.message)}</p>
    <p><a href="/">Back to home</a></p></div></div></body></html>`);
  }
});

module.exports = router;
