import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock(
  './WebhookRegistration',
  () =>
    function WebhookRegistration() {
      return <div data-testid="webhook-form">WebhookRegistration</div>;
    }
);

describe('App', () => {
  it('renders WebhookRegistration', () => {
    render(<App />);
    expect(screen.getByTestId('webhook-form')).toBeInTheDocument();
  });
});
