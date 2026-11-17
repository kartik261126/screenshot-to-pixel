import { simulateRequest } from "./config";
import { auditLogs } from "./data";
export const getAuditLogs = () => simulateRequest(auditLogs);