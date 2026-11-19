export const apiConfig = {
  baseUrl: import.meta.env["VITE_API_BASE_URL"] ?? "",
  sogoBaseUrl: import.meta.env["VITE_SOGO_BASE_URL"] ?? "https://mail.company.com",
  companyDomain: import.meta.env["VITE_COMPANY_DOMAIN"] ?? "company.com",
};

export type DemoFailure = "none" | "mailcow" | "sql" | "next-job";
let demoFailure: DemoFailure = "none";

export function setDemoFailure(value: DemoFailure) {
  demoFailure = value;
}

export function getDemoFailure() {
  return demoFailure;
}

export async function simulateRequest<T>(value: T): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, 300 + Math.round(Math.random() * 500)));
  if (demoFailure === "sql") throw new Error("Service temporarily unavailable — no changes were made.");
  return structuredClone(value);
}