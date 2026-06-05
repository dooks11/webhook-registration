# Webhook Registration

A minimal React application with a webhook registration service, unit tests, and automated CI via GitHub Actions.

## Features

- **Webhook Service** (`webhookService.js`) — registers notification URLs via `fetch` POST requests
- **React Component** (`WebhookRegistration.jsx`) — form UI with loading, success, and error states
- **Unit Tests** — Jest + React Testing Library for service logic and component behavior
- **CI/CD** — GitHub Actions workflow runs tests on every push and pull request

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── test.yml          # GitHub Actions CI workflow
├── babel.config.js           # Babel preset for Jest
├── jest.config.js            # Jest configuration (jsdom environment)
├── jest.setup.js             # Jest setup (jest-dom matchers, warning suppressions)
├── package.json              # Dependencies and scripts
├── package-lock.json         # Lockfile for reproducible installs
├── webhookService.js         # API service: registerWebhook(notificationUrl)
├── webhookService.test.js    # Unit tests for the service
├── WebhookRegistration.jsx   # React form component
└── WebhookRegistration.test.jsx  # Component unit tests
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install Dependencies

```bash
npm ci
```

### Run Tests

```bash
npm test
```

### Use the Component

Import the component and render it in your React app:

```jsx
import WebhookRegistration from './WebhookRegistration';

function App() {
  return <WebhookRegistration />;
}
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `REACT_APP_API_URL` | `https://api.example.com` | Base URL for webhook API |

## CI/CD

The `Test` workflow (`.github/workflows/test.yml`) runs automatically on pushes and pull requests to `master` or `main`.

## Contributing

Contributions are welcome. Please open an issue or pull request on GitHub.

## License

MIT
