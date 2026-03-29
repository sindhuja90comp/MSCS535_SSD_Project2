function tokenize(expression) {
  const tokens = [];
  let index = 0;

  while (index < expression.length) {
    const char = expression[index];

    if (/\s/.test(char)) {
      index += 1;
      continue;
    }

    if (/[0-9.]/.test(char)) {
      let value = char;
      index += 1;

      while (index < expression.length && /[0-9.]/.test(expression[index])) {
        value += expression[index];
        index += 1;
      }

      if (!/^\d+(\.\d+)?$/.test(value) && !/^\.\d+$/.test(value)) {
        throw new Error('Invalid number format.');
      }

      tokens.push({ type: 'number', value: Number(value) });
      continue;
    }

    if ('+-*/()'.includes(char)) {
      tokens.push({ type: char, value: char });
      index += 1;
      continue;
    }

    throw new Error('Unsafe characters detected in expression.');
  }

  return tokens;
}

function parseExpression(tokens) {
  let position = 0;

  function currentToken() {
    return tokens[position];
  }

  function consume(expectedType) {
    const token = currentToken();
    if (!token || token.type !== expectedType) {
      throw new Error('Unsupported expression syntax.');
    }
    position += 1;
    return token;
  }

  function parsePrimary() {
    const token = currentToken();

    if (!token) {
      throw new Error('Expression is incomplete.');
    }

    if (token.type === 'number') {
      position += 1;
      return token.value;
    }

    if (token.type === '(') {
      consume('(');
      const value = parseAddSubtract();
      consume(')');
      return value;
    }

    if (token.type === '-') {
      consume('-');
      return -parsePrimary();
    }

    if (token.type === '+') {
      consume('+');
      return parsePrimary();
    }

    throw new Error('Unsupported expression syntax.');
  }

  function parseMultiplyDivide() {
    let value = parsePrimary();

    while (currentToken() && (currentToken().type === '*' || currentToken().type === '/')) {
      const operator = currentToken().type;
      position += 1;
      const right = parsePrimary();

      if (operator === '*') {
        value *= right;
      } else {
        if (right === 0) {
          throw new Error('Division by zero is not allowed.');
        }
        value /= right;
      }
    }

    return value;
  }

  function parseAddSubtract() {
    let value = parseMultiplyDivide();

    while (currentToken() && (currentToken().type === '+' || currentToken().type === '-')) {
      const operator = currentToken().type;
      position += 1;
      const right = parseMultiplyDivide();
      value = operator === '+' ? value + right : value - right;
    }

    return value;
  }

  const result = parseAddSubtract();

  if (position !== tokens.length) {
    throw new Error('Unsupported expression syntax.');
  }

  return result;
}

function safeMathEvaluator(expression = '') {
  const trimmed = String(expression).trim();

  if (!trimmed) {
    throw new Error('Expression is required.');
  }

  const tokens = tokenize(trimmed);
  const result = parseExpression(tokens);

  if (typeof result !== 'number' || Number.isNaN(result) || !Number.isFinite(result)) {
    throw new Error('Expression did not evaluate to a finite number.');
  }

  return result;
}

module.exports = safeMathEvaluator;
