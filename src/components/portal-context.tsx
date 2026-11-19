import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Role } from "@/api/types";

interface PortalSession {
  role: Role;
  setRole: (role: Role) => void;
  signedIn: boolean;
  signIn: (role: Role) => void;
  signOut: () => void;
  theme: "Light" | "Dark" | "System";
  setTheme: (theme: "Light" | "Dark" | "System") => void;
}

const PortalContext = createContext<PortalSession | null>(null);

export function PortalSessionProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("Employee");
  const [signedIn, setSignedIn] = useState(true);
  const [theme, setTheme] = useState<PortalSession["theme"]>("Light");

  useEffect(() => {
    const systemDark = theme === "System" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", theme === "Dark" || systemDark);
  }, [theme]);

  return <PortalContext.Provider value={{ role, setRole, signedIn, signIn: (nextRole) => { setRole(nextRole); setSignedIn(true); }, signOut: () => setSignedIn(false), theme, setTheme }}>{children}</PortalContext.Provider>;
}

export function usePortalSession() {
  const value = useContext(PortalContext);
  if (!value) throw new Error("Portal session is unavailable");
  return value;
}