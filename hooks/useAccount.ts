"use client";

import { source } from "@/lib/data/source";
import { useResource } from "./useResource";

/** Sign-in methods, account operations, sessions and login history. */
export function useLogin() {
  return useResource(() => source.getLogin());
}

/** Roles, permission matrix, team and organisation policies. */
export function useOrganisation() {
  return useResource(() => source.getOrganisation());
}

/** Quota usage, payment methods, invoice details and invoice history. */
export function useBilling() {
  return useResource(() => source.getBilling());
}

/** Channel matrix, delivery endpoints and notification hygiene. */
export function useNotifications() {
  return useResource(() => source.getNotifications());
}

/** Onboarding wizard, industry-code routing and support channels. */
export function useOnboarding() {
  return useResource(() => source.getOnboarding());
}

/** Compliance blocks, API keys, webhooks and developer tooling. */
export function useSecurity() {
  return useResource(() => source.getSecurity());
}
