import { describe, expect, it } from "vitest";
import { canAccessPath } from "@/api/access";

describe("portal role access", () => {
  it("keeps employee pages separate from administration", () => {
    expect(canAccessPath("Employee", "/directory")).toBe(true);
    expect(canAccessPath("Employee", "/admin")).toBe(false);
  });

  it("limits support to employee and mailbox management", () => {
    expect(canAccessPath("Support", "/admin/employees")).toBe(true);
    expect(canAccessPath("Support", "/admin/mailboxes")).toBe(true);
    expect(canAccessPath("Support", "/admin/settings")).toBe(false);
  });

  it("keeps auditors read-only on audit and health pages", () => {
    expect(canAccessPath("Auditor", "/admin/audit")).toBe(true);
    expect(canAccessPath("Auditor", "/admin/health")).toBe(true);
    expect(canAccessPath("Auditor", "/admin/jobs")).toBe(false);
  });
});