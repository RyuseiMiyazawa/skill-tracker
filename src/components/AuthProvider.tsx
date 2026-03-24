"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { usePathname, useRouter } from "next/navigation";
import {
  disableGuestMode,
  enableGuestMode,
  isGuestModeEnabled,
} from "@/lib/guestSkills";

type AuthContextType = {
  user: User | null;
  isGuest: boolean;
  loading: boolean;
  startGuestMode: () => void;
  exitGuestMode: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isGuest: false,
  loading: true,
  startGuestMode: () => undefined,
  exitGuestMode: () => undefined,
});

const PUBLIC_PATHS = new Set(["/login", "/forgot-password", "/reset-password"]);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const guestMode = !session?.user && isGuestModeEnabled();
      setUser(session?.user ?? null);
      setIsGuest(guestMode);
      setLoading(false);

      if (session?.user || guestMode) {
        if (pathname === "/login") {
          router.replace("/");
        }
        return;
      }

      if (!PUBLIC_PATHS.has(pathname)) {
        router.replace("/login");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const guestMode = !session?.user && isGuestModeEnabled();
      setUser(session?.user ?? null);
      setIsGuest(guestMode);
      setLoading(false);

      if (session?.user) {
        disableGuestMode();
        setIsGuest(false);
        if (pathname === "/login") {
          router.replace("/");
        }
        router.refresh();
        return;
      }

      if (guestMode) {
        if (pathname === "/login") {
          router.replace("/");
        }
        router.refresh();
        return;
      }

      if (!PUBLIC_PATHS.has(pathname)) {
        router.replace("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

  const startGuestMode = () => {
    enableGuestMode();
    setUser(null);
    setIsGuest(true);
    setLoading(false);
    router.replace("/");
    router.refresh();
  };

  const exitGuestMode = () => {
    disableGuestMode();
    setIsGuest(false);
    router.replace("/login");
    router.refresh();
  };

  return (
    <AuthContext.Provider
      value={{ user, isGuest, loading, startGuestMode, exitGuestMode }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
