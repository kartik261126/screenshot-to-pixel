import type { Role } from "./types";

const employeePages = new Set(["/", "/directory", "/notifications", "/settings"]);
const supportPages = new Set(["/admin/employees", "/admin/mailboxes"]);
const auditorPages = new Set(["/admin/audit", "/admin/health"]);

export function canAccessPath(role: Role, pathname: string) {
  if (role === "Admin") return pathname === "/admin" || pathname.startsWith("/admin/");
  if (role === "Employee") return employeePages.has(pathname);
  if (role === "Support") {
    return [...supportPages].some((path) => pathname === path || pathname.startsWith(`${path}/`));
  }
  return auditorPages.has(pathname);
}