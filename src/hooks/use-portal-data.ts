import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as apiUsers from "@/api/users";
import * as apiMailboxes from "@/api/mailboxes";
import * as apiLists from "@/api/lists";
import * as apiJobs from "@/api/jobs";
import * as apiAudit from "@/api/audit";
import * as apiHealth from "@/api/health";
import * as apiNotifications from "@/api/notifications";
import * as apiPreferences from "@/api/preferences";

export const portalKeys = {
  users: ["users"] as const,
  me: ["me"] as const,
  mailboxes: ["mailboxes"] as const,
  lists: ["lists"] as const,
  jobs: ["jobs"] as const,
  audit: ["audit"] as const,
  health: ["health"] as const,
  notifications: ["notifications"] as const,
  preferences: ["preferences"] as const,
};

export const useUsers = () => useQuery({ queryKey: portalKeys.users, queryFn: apiUsers.getUsers });
export const useMe = () => useQuery({ queryKey: portalKeys.me, queryFn: apiUsers.getMe });
export const useMailboxes = () => useQuery({ queryKey: portalKeys.mailboxes, queryFn: apiMailboxes.getMailboxes, refetchInterval: 5000 });
export const useLists = () => useQuery({ queryKey: portalKeys.lists, queryFn: apiLists.getLists });
export const useJobs = (poll = false) => useQuery({ queryKey: portalKeys.jobs, queryFn: apiJobs.getJobs, refetchInterval: poll ? 10000 : false });
export const useAudit = () => useQuery({ queryKey: portalKeys.audit, queryFn: apiAudit.getAuditLogs });
export const useHealth = () => useQuery({ queryKey: portalKeys.health, queryFn: apiHealth.getHealth, refetchInterval: 15000 });
export const useNotifications = () => useQuery({ queryKey: portalKeys.notifications, queryFn: apiNotifications.getNotifications });
export const usePreferences = () => useQuery({ queryKey: portalKeys.preferences, queryFn: apiPreferences.getPreferences });

function useInvalidate(...keys: (readonly unknown[])[]) {
  const queryClient = useQueryClient();
  return async () => Promise.all(keys.map((queryKey) => queryClient.invalidateQueries({ queryKey })));
}

export function useCreateUser() {
  const invalidate = useInvalidate(portalKeys.users, portalKeys.mailboxes, portalKeys.jobs, portalKeys.audit);
  return useMutation({ mutationFn: apiUsers.createUser, onSuccess: invalidate });
}
export function useUpdateUser() {
  const invalidate = useInvalidate(portalKeys.users, portalKeys.audit);
  return useMutation({ mutationFn: ({ id, updates }: Parameters<typeof apiUsers.updateUser> extends [string, infer U] ? { id: string; updates: U } : never) => apiUsers.updateUser(id, updates), onSuccess: invalidate });
}
export function useDisableUser() {
  const invalidate = useInvalidate(portalKeys.users, portalKeys.mailboxes, portalKeys.audit);
  return useMutation({ mutationFn: apiUsers.disableUser, onSuccess: invalidate });
}
export function useCreateMailbox() {
  const invalidate = useInvalidate(portalKeys.mailboxes, portalKeys.jobs, portalKeys.audit);
  return useMutation({ mutationFn: ({ userId, address, quota }: { userId: string; address: string; quota: number }) => apiMailboxes.createMailbox(userId, address, quota), onSuccess: invalidate });
}
export function useChangeQuota() {
  const invalidate = useInvalidate(portalKeys.mailboxes, portalKeys.jobs, portalKeys.audit);
  return useMutation({ mutationFn: ({ id, quota }: { id: string; quota: number }) => apiMailboxes.updateQuota(id, quota), onSuccess: invalidate });
}
export function useRetryMailbox() {
  const invalidate = useInvalidate(portalKeys.mailboxes, portalKeys.jobs);
  return useMutation({ mutationFn: apiMailboxes.retryMailbox, onSuccess: invalidate });
}
export function useCreateList() {
  const invalidate = useInvalidate(portalKeys.lists, portalKeys.audit);
  return useMutation({ mutationFn: ({ displayName, localPart, members }: { displayName: string; localPart: string; members: string[] }) => apiLists.createList(displayName, localPart, members), onSuccess: invalidate });
}
export function useChangeListMember() {
  const invalidate = useInvalidate(portalKeys.lists, portalKeys.audit);
  return useMutation({ mutationFn: ({ id, userId, operation }: { id: string; userId: string; operation: "add" | "remove" }) => apiLists.changeListMember(id, userId, operation), onSuccess: invalidate });
}
export function useRetryJob() {
  const invalidate = useInvalidate(portalKeys.jobs, portalKeys.mailboxes, portalKeys.audit);
  return useMutation({ mutationFn: apiJobs.retryJob, onSuccess: invalidate });
}
export function useMarkNotificationRead() {
  const invalidate = useInvalidate(portalKeys.notifications);
  return useMutation({ mutationFn: apiNotifications.markNotificationRead, onSuccess: invalidate });
}
export function useMarkAllNotificationsRead() {
  const invalidate = useInvalidate(portalKeys.notifications);
  return useMutation({ mutationFn: apiNotifications.markAllNotificationsRead, onSuccess: invalidate });
}
export function useSavePreferences() {
  const invalidate = useInvalidate(portalKeys.preferences);
  return useMutation({ mutationFn: apiPreferences.updatePreferences, onSuccess: invalidate });
}