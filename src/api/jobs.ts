import { simulateRequest } from "./config";
import { jobs } from "./data";
import type { ProvisioningJob } from "./types";

export const getJobs = () => simulateRequest(jobs);
export async function retryJob(id: string) {
  const job = jobs.find((item) => item.id === id);
  if (!job) throw new Error("Provisioning job not found");
  job.attempts += 1;
  job.status = "Processing";
  job.lastError = null;
  job.updatedAt = new Date().toISOString();
  return simulateRequest(job);
}
export function addJob(job: ProvisioningJob) { jobs.unshift(job); }