import React from 'react';
import { PostHogProvider } from 'posthog-js/react';

const posthogApiKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

export const PHProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <PostHogProvider
    apiKey={posthogApiKey}
    options={{
      api_host: posthogHost,
      defaults: '2025-05-24',
      capture_exceptions: true,
      debug: import.meta.env.MODE === 'development',
    }}
  >
    {children}
  </PostHogProvider>
);

export * from 'posthog-js/react';