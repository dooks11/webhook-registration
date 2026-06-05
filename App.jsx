import React from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import LoginForm from './LoginForm';
import WebhookRegistration from './WebhookRegistration';

function AppContent() {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '1rem',
          fontFamily: 'sans-serif',
        }}
      >
        <button onClick={logout} style={{ padding: '0.5rem 1rem' }}>
          Log Out
        </button>
      </div>
      <WebhookRegistration />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
