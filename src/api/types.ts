export type Role = "Employee" | "Admin" | "Support" | "Auditor";
export type UserStatus = "Active" | "Pending" | "Suspended" | "Disabled";
export type MailboxStatus = "Active" | "Pending" | "Disabled" | "Error";
export type ProvisioningStatus = "Pending" | "Processing" | "Success" | "Failed" | "TimedOut";

export const departments = ["Engineering", "HR", "Sales", "Finance", "Support", "IT"] as const;
export type Department = (typeof departments)[number];

export interface User {
  id: string;
  fullName: string;
  displayName: string;
  email: string;
  departmentId: Department;
  role: Role;
  status: UserStatus;
  mailboxId: string;
  createdAt: string;
}

export interface Mailbox {
  id: string;
  userId: string;
  address: string;
  aliases: string[];
  status: MailboxStatus;
  quotaGb: number;
  usedGb: number;
  provisioning: ProvisioningStatus;
}

export interface ProvisioningStep {
  name: string;
  status: "complete" | "failed" | "pending";
  detail?: string;
  at: string;
}

export interface ProvisioningJob {
  id: string;
  userId: string;
  operation: "CREATE_MAILBOX" | "UPDATE_QUOTA" | "DISABLE_MAILBOX" | "CREATE_LIST" | "UPDATE_LIST";
  status: ProvisioningStatus;
  attempts: number;
  lastError: string | null;
  createdAt: string;
  updatedAt: string;
  steps: ProvisioningStep[];
}

export interface DistributionList {
  id: string;
  address: string;
  displayName: string;
  status: "Active" | "Draft";
  members: string[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  status: "OK" | "Failed" | "Denied";
  metadata: Record<string, unknown>;
}

export interface NotificationEvent {
  id: string;
  type: "provisioning" | "storage" | "security";
  title: string;
  reference: string;
  read: boolean;
  createdAt: string;
}

export interface HealthService {
  name: string;
  status: "healthy" | "warning" | "critical";
  detail: string;
}

export interface UserPreferences {
  theme: "Light" | "Dark" | "System";
  notifyProvisioning: boolean;
  notifyStorage: boolean;
  notifySecurity: boolean;
}