"use client";

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR: avoid refetching immediately on client after server-side hydration
        staleTime: 60 * 1000,
      },
    },
  });
}

// Browser: singleton — reuse existing instance.
// Server: always make a new QueryClient per-request to prevent data leakage.
let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  }

  // Browser: reuse singleton, create if not yet exists
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

export const QueryProvider = ({ children }: PropsWithChildren) => {
  // NOTE: Not using useState to avoid needing a Suspense boundary above this component
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
