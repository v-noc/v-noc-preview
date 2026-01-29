import React, { useEffect, useState } from 'react';

const posthogApiKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

export const PHProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [PostHogProvider, setPostHogProvider] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    // Only load PostHog on client side
    if (typeof window === 'undefined') {
      return;
    }

    // Use dynamic import with template string to prevent static analysis during SSR build
    const posthogModule = 'posthog-js/react';
    import(/* @vite-ignore */ posthogModule)
      .then((module) => {
        // Handle both ESM and CommonJS exports
        const Provider = module.PostHogProvider || module.default?.PostHogProvider || module.default;
        if (Provider) {
          setPostHogProvider(() => Provider);
        }
      })
      .catch((error) => {
        console.warn('Failed to load PostHog:', error);
      });
  }, []);

  // Render children without PostHog on server side or if not loaded
  if (typeof window === 'undefined' || !PostHogProvider) {
    return <>{children}</>;
  }

  return (
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
};

// PostHog hooks should be imported directly in components that need them
// Example: const { usePostHog } = await import('posthog-js/react');
// Or use dynamic imports in components that need these hooks