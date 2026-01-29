import React, { useEffect, useState } from "react";

const posthogApiKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

export const PHProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [PostHogProvider, setPostHogProvider] =
    useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    // 1. This check ensures the code only executes in the browser
    if (typeof window === "undefined") return;

    const initPostHog = async () => {
      try {
        // 2. Use a literal string so Vite knows to bundle this for the browser
        // 3. We use the browser-specific entry point to be safe
        const posthog = await import("posthog-js/react");

        const Provider =
          posthog.PostHogProvider || (posthog as any).default?.PostHogProvider;

        if (Provider) {
          setPostHogProvider(() => Provider);
        }
      } catch (error) {
        console.error("PostHog resolution error:", error);
      }
    };

    initPostHog();
  }, []);

  // Render children without PostHog on server side or if not loaded
  if (typeof window === "undefined" || !PostHogProvider) {
    return <>{children}</>;
  }

  return (
    <PostHogProvider
      apiKey={posthogApiKey}
      options={{
        api_host: posthogHost,
        defaults: "2025-05-24",
        capture_exceptions: true,
        debug: import.meta.env.MODE === "development",
      }}
    >
      {children}
    </PostHogProvider>
  );
};

// PostHog hooks should be imported directly in components that need them
// Example: const { usePostHog } = await import('posthog-js/react');
// Or use dynamic imports in components that need these hooks
