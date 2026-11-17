import { simulateRequest } from "./config";
import { defaultPreferences } from "./data";
import type { UserPreferences } from "./types";
let preferences = { ...defaultPreferences };
export const getPreferences = () => simulateRequest(preferences);
export async function updatePreferences(value: UserPreferences) {
  preferences = { ...value };
  return simulateRequest(preferences);
}