import { getDemoFailure, simulateRequest } from "./config";
import { health } from "./data";
export const getHealth = () => simulateRequest(health.map((service) => getDemoFailure() === "mailcow" && service.name.startsWith("Postfix") ? { ...service, status: "critical" as const, detail: "Service unavailable — retrying automatically" } : service));