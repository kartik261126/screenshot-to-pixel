import { simulateRequest } from "./config";
import { notifications } from "./data";
export const getNotifications = () => simulateRequest(notifications);
export async function markNotificationRead(id: string) {
  const item = notifications.find((entry) => entry.id === id);
  if (item) item.read = true;
  return simulateRequest(notifications);
}
export async function markAllNotificationsRead() {
  notifications.forEach((item) => { item.read = true; });
  return simulateRequest(notifications);
}