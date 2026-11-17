import { getDemoFailure, simulateRequest } from "./config";
import { mailboxes } from "./data";
import type { Mailbox } from "./types";

export const getMailboxes = () => simulateRequest(mailboxes);
export const getMailboxStatus = (id: string) => simulateRequest(mailboxes.find((item) => item.id === id));

export async function createMailbox(userId: string, address: string, quotaGb = 3) {
  const mailbox: Mailbox = { id: `MB-${String(mailboxes.length + 1).padStart(3, "0")}`, userId, address, aliases: [], status: "Pending", quotaGb, usedGb: 0, provisioning: "Pending" };
  mailboxes.unshift(mailbox);
  if (getDemoFailure() === "mailcow" || getDemoFailure() === "next-job") {
    mailbox.status = "Error";
    mailbox.provisioning = "Failed";
    throw new Error("Mailbox creation failed: mail service unreachable");
  }
  return simulateRequest(mailbox);
}

export async function updateQuota(id: string, quotaGb: number) {
  const mailbox = mailboxes.find((item) => item.id === id);
  if (!mailbox) throw new Error("Mailbox not found");
  mailbox.quotaGb = quotaGb;
  return simulateRequest(mailbox);
}

export async function retryMailbox(id: string) {
  const mailbox = mailboxes.find((item) => item.id === id);
  if (!mailbox) throw new Error("Mailbox not found");
  mailbox.status = "Pending";
  mailbox.provisioning = "Processing";
  return simulateRequest(mailbox);
}