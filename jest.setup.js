import '@testing-library/jest-dom';

// Suppress React act() warnings in async tests (Testing Library v14 + React 18)
const originalError = console.error;
console.error = (...args) => {
  if (/Warning:.*not wrapped in act/.test(args[0])) {
    return;
  }
  originalError(...args);
};
