import { simulateRequest } from "./config";
import { lists } from "./data";
import type { DistributionList } from "./types";

export const getLists = () => simulateRequest(lists);
export async function createList(displayName: string, localPart: string, members: string[] = []) {
  const list: DistributionList = { id: `DL-${String(lists.length + 1).padStart(2, "0")}`, displayName, address: `${localPart}@company.com`, status: "Active", members };
  lists.unshift(list);
  return simulateRequest(list);
}
export async function changeListMember(id: string, userId: string, operation: "add" | "remove") {
  const list = lists.find((item) => item.id === id);
  if (!list) throw new Error("Distribution list not found");
  list.members = operation === "add" ? [...new Set([...list.members, userId])] : list.members.filter((member) => member !== userId);
  return simulateRequest(list);
}