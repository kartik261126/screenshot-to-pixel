import { simulateRequest } from "./config";
import { users } from "./data";
import type { Department, Role, User } from "./types";

export const getUsers = () => simulateRequest(users);
export const getMe = () => simulateRequest(users[0]);

export async function createUser(input: { fullName: string; email: string; departmentId: Department; role: Role }) {
  if (users.some((user) => user.email.toLowerCase() === input.email.toLowerCase())) {
    throw new Error("Email already exists");
  }
  const id = `U-${String(users.length + 1).padStart(3, "0")}`;
  const user: User = {
    id, ...input, displayName: input.fullName, status: "Pending", mailboxId: `MB-${String(users.length + 1).padStart(3, "0")}`,
    createdAt: new Date().toISOString(),
  };
  users.unshift(user);
  return simulateRequest(user);
}

export async function updateUser(id: string, updates: Partial<Pick<User, "fullName" | "displayName" | "departmentId" | "role" | "status">>) {
  const user = users.find((item) => item.id === id);
  if (!user) throw new Error("Employee not found");
  Object.assign(user, updates);
  return simulateRequest(user);
}

export async function disableUser(id: string) {
  return updateUser(id, { status: "Disabled" });
}