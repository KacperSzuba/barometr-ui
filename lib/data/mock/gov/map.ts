import type { RegionalMap } from "@/lib/data/types";

/** No `regions`, `details` or `fallback` — `mockSource` adds them from the shared set. */
export const regionalMap: Omit<RegionalMap, "regions" | "details" | "fallback"> = {
  topics: ["Energy prices", "Healthcare", "Housing", "Security", "EU funds", "Education"],

  sources: [
    { key: "press", label: "PRESS" },
    { key: "social", label: "SOCIAL" },
    { key: "polls", label: "POLLS" },
    { key: "contacts", label: "CONTACTS" },
  ],

  national: "47.2",
  nationalMoe: "2.1",
};
