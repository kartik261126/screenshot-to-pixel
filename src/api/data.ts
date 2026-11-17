import type {
  AuditLog,
  DistributionList,
  HealthService,
  Mailbox,
  NotificationEvent,
  ProvisioningJob,
  User,
  UserPreferences,
} from "./types";

const people: Array<[string, string, string]> = [
  ["Rahul", "Sharma", "Engineering"], ["Priya", "Nair", "HR"], ["Amit", "Verma", "Sales"],
  ["Sneha", "Iyer", "Finance"], ["Karan", "Mehta", "Engineering"], ["Neha", "Gupta", "Support"],
  ["Vikram", "Singh", "Finance"], ["Meera", "Das", "Engineering"], ["Anita", "Rao", "IT"],
  ["Arjun", "Kapoor", "Sales"], ["Kavya", "Menon", "Engineering"], ["Rohan", "Joshi", "Support"],
  ["Ishita", "Patel", "HR"], ["Dev", "Malhotra", "Finance"], ["Aisha", "Khan", "Engineering"],
  ["Nikhil", "Reddy", "IT"], ["Pooja", "Shah", "Sales"], ["Aditya", "Kulkarni", "Engineering"],
  ["Sana", "Thomas", "Support"], ["Varun", "Bose", "Finance"], ["Diya", "Raman", "HR"],
  ["Kabir", "Sethi", "Engineering"], ["Ananya", "Pillai", "Sales"], ["Manish", "Ghosh", "IT"],
];
const team = ["Engineering", "HR", "Sales", "Finance", "Support", "IT"] as const;
const specialStatuses: Record<string, User["status"]> = { "Neha Gupta": "Disabled", "Vikram Singh": "Pending" };

export const users: User[] = Array.from({ length: 142 }, (_, index) => {
  const [first, last, departmentId] = people[index % people.length] ?? ["Team", "Member", team[0]];
  const fullName = `${first} ${last}${index >= people.length ? ` ${Math.floor(index / people.length) + 1}` : ""}`;
  const id = `U-${String(index + 1).padStart(3, "0")}`;
  const email = `${first[0]?.toLowerCase() ?? "x"}.${last.toLowerCase()}${index >= people.length ? index : ""}@company.com`;
  return {
    id, fullName, displayName: fullName, email, departmentId: departmentId as User["departmentId"],
    role: fullName === "Anita Rao" ? "Admin" : "Employee",
    status: specialStatuses[fullName] ?? "Active", mailboxId: `MB-${String(index + 1).padStart(3, "0")}`,
    createdAt: new Date(Date.UTC(2025, index % 12, (index % 27) + 1)).toISOString(),
  };
});

export const mailboxes: Mailbox[] = users.map((user, index) => ({
  id: user.mailboxId, userId: user.id, address: user.email,
  aliases: index % 11 === 0 ? [`${user.email.split("@")[0]}-team@company.com`] : [],
  status: user.fullName === "Meera Das" ? "Error" : user.status === "Disabled" ? "Disabled" : user.status === "Pending" ? "Pending" : "Active",
  quotaGb: index === 0 ? 3 : index % 15 === 0 ? 10 : 3,
  usedGb: user.fullName === "Meera Das" ? 1.8 : index % 14 === 0 ? 2.85 : Number((0.35 + (index % 19) * 0.091).toFixed(2)),
  provisioning: user.fullName === "Meera Das" ? "Failed" : user.status === "Pending" ? "Pending" : "Success",
}));

export const lists: DistributionList[] = [
  { id: "DL-01", address: "engineering@company.com", displayName: "Engineering", status: "Active", members: users.filter((u) => u.departmentId === "Engineering").slice(0, 18).map((u) => u.id) },
  { id: "DL-02", address: "all-hands@company.com", displayName: "All hands", status: "Active", members: users.slice(0, 12).map((u) => u.id) },
  { id: "DL-03", address: "people@company.com", displayName: "People & culture", status: "Active", members: users.filter((u) => u.departmentId === "HR").slice(0, 6).map((u) => u.id) },
  { id: "DL-04", address: "interns-2026@company.com", displayName: "Interns 2026", status: "Draft", members: [] },
];

const now = Date.now();
export const jobs: ProvisioningJob[] = [
  { id: "JOB-1051", userId: "U-008", operation: "UPDATE_QUOTA", status: "Failed", attempts: 2, lastError: "Quota update rejected by mailcow API", createdAt: new Date(now - 3600000).toISOString(), updatedAt: new Date(now - 300000).toISOString(), steps: [{ name: "Request created", status: "complete", at: new Date(now - 3600000).toISOString() }, { name: "Quota updated", status: "failed", detail: "Quota update rejected by mailcow API", at: new Date(now - 300000).toISOString() }] },
  { id: "JOB-1049", userId: "U-007", operation: "CREATE_MAILBOX", status: "TimedOut", attempts: 3, lastError: "mailcow API timeout", createdAt: new Date(now - 7200000).toISOString(), updatedAt: new Date(now - 1800000).toISOString(), steps: [{ name: "Request created", status: "complete", at: new Date(now - 7200000).toISOString() }, { name: "mailcow request", status: "failed", detail: "mailcow API timeout", at: new Date(now - 1800000).toISOString() }] },
  { id: "JOB-1052", userId: "U-008", operation: "CREATE_MAILBOX", status: "Processing", attempts: 1, lastError: null, createdAt: new Date(now - 600000).toISOString(), updatedAt: new Date(now - 60000).toISOString(), steps: [{ name: "Request created", status: "complete", at: new Date(now - 600000).toISOString() }, { name: "Verification", status: "pending", at: new Date(now - 60000).toISOString() }] },
  { id: "JOB-1047", userId: "U-001", operation: "CREATE_MAILBOX", status: "Success", attempts: 1, lastError: null, createdAt: new Date(now - 86400000).toISOString(), updatedAt: new Date(now - 85000000).toISOString(), steps: [{ name: "Mailbox created", status: "complete", at: new Date(now - 85000000).toISOString() }] },
  ...users.slice(1, 10).map((user, index): ProvisioningJob => ({
    id: `JOB-${1040 - index}`, userId: user.id, operation: "CREATE_MAILBOX", status: "Success", attempts: 1,
    lastError: null, createdAt: user.createdAt, updatedAt: user.createdAt,
    steps: [{ name: "Mailbox created", status: "complete", at: user.createdAt }],
  })),
];

export const auditLogs: AuditLog[] = [
  ["Created employee", "Anita Rao", "/api/users/U-018", "OK", { department: "Engineering", mailboxProvisioning: "started" }],
  ["Changed mailbox quota", "Anita Rao", "/api/mailboxes/MB-008/quota", "OK", { previous: "3 GB", updated: "5 GB", reason: "Project storage" }],
  ["Mailbox provisioning failed", "System", "/api/mailboxes/MB-008", "Failed", { jobId: "JOB-1051", error: "Quota update rejected by mailcow API" }],
  ["Disabled account", "Anita Rao", "/api/users/U-006/disable", "OK", { preserved: true, retention: "per company policy" }],
  ["Distribution list modified", "Anita Rao", "/api/distribution-lists/DL-01", "OK", { memberCount: 18 }],
  ["Unauthorized admin action", "Unknown actor", "/api/users", "Denied", { reason: "Insufficient permissions" }],
].map(([action, actor, target, status, metadata], index) => ({ id: `AUD-${index + 1}`, action: String(action), actor: String(actor), target: String(target), status: status as AuditLog["status"], metadata: metadata as Record<string, unknown>, timestamp: new Date(now - index * 7200000).toISOString() }));

export const notifications: NotificationEvent[] = [
  { id: "N-01", type: "provisioning", title: "Mailbox provisioning needs attention", reference: "JOB-1051", read: false, createdAt: new Date(now - 1800000).toISOString() },
  { id: "N-02", type: "storage", title: "Two mailboxes are above 90% of quota", reference: "Storage", read: false, createdAt: new Date(now - 7200000).toISOString() },
  { id: "N-03", type: "security", title: "MFA is enabled for your account", reference: "Security", read: false, createdAt: new Date(now - 86400000).toISOString() },
  { id: "N-04", type: "provisioning", title: "Mailbox is ready", reference: "JOB-1047", read: true, createdAt: new Date(now - 172800000).toISOString() },
];

export const health: HealthService[] = [
  { name: "mailcow", status: "healthy", detail: "All containers operational" },
  { name: "Postfix · SMTP", status: "critical", detail: "Service unavailable — retrying automatically" },
  { name: "Dovecot · IMAP", status: "healthy", detail: "Accepting connections" },
  { name: "SOGo", status: "healthy", detail: "Webmail service operational" },
  { name: "Rspamd", status: "healthy", detail: "Scanning normally" },
  { name: "ClamAV", status: "warning", detail: "Signature update late · 2 days" },
  { name: "SQL Server", status: "healthy", detail: "Connected · 14 ms" },
  { name: "Storage", status: "warning", detail: "78% used · 2 mailboxes above 90%" },
  { name: "Mail queue", status: "healthy", detail: "7 messages queued" },
  { name: "Backup", status: "healthy", detail: "Last backup 6 hours ago" },
  { name: "TLS certificate", status: "healthy", detail: "Expires in 41 days" },
];

export const defaultPreferences: UserPreferences = { theme: "Light", notifyProvisioning: true, notifyStorage: true, notifySecurity: true };