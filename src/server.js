const express = require('express');
const helmet = require('helmet');
const vulnerableRoutes = require('./routes/vulnerableRoutes');
const secureRoutes = require('./routes/secureRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/style.css', express.static('public/style.css'));
app.use(helmet({ contentSecurityPolicy: false }));
app.use('/secure', helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    objectSrc: ["'none'"],
    baseUri: ["'self'"],
    frameAncestors: ["'none'"],
    upgradeInsecureRequests: []
  }
}));

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" />
  <title>Project 2 - Secure Software Design</title><link rel="stylesheet" href="/style.css" /></head><body>
  <div class="container">
  <div class="card"><h1>Project 2: Secure Software Design</h1>
  <p>This application demonstrates:</p>
  <ul><li>Code injection via web applications (reflected XSS)</li>
  <li>Dynamic evaluation using <code>eval()</code></li>
  <li>Mitigations including output encoding and CSP</li></ul></div>
  <div class="card"><h2>Vulnerable Routes</h2>
  <ul><li><a href="/vulnerable/xss?name=Guest">/vulnerable/xss?name=Guest</a></li>
  <li><a href="/vulnerable/eval?expression=2+%2B+2">/vulnerable/eval?expression=2 + 2</a></li></ul></div>
  <div class="card"><h2>Secure Routes</h2>
  <ul><li><a href="/secure/xss?name=Guest">/secure/xss?name=Guest</a></li>
  <li><a href="/secure/eval?expression=2+%2B+2">/secure/eval?expression=2 + 2</a></li></ul></div>
  </div></body></html>`);
});

app.use('/vulnerable', vulnerableRoutes);
app.use('/secure', secureRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Open the browser and test both vulnerable and secure routes.');
});
