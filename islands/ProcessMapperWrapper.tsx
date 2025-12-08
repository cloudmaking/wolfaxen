import { useEffect, useState } from "preact/hooks";
import ProcessMapper from "./ProcessMapper.tsx";
import { UserState } from "../types.ts";

export default function ProcessMapperWrapper(
  { initialUser, initialMaps = [], prefill = "" }: {
    initialUser: UserState;
    initialMaps?: any[];
    prefill?: string;
  },
) {
  const [user, setUser] = useState<UserState>(initialUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser({
            isLoggedIn: true,
            usageCount: data.profile?.usage_count ?? 0,
            isSubscribed: data.profile?.is_subscribed ?? false,
          });
        } else {
          setUser({ isLoggedIn: false, usageCount: 0, isSubscribed: false });
        }
      } catch (err) {
        console.error("Session check failed", err);
        setUser({ isLoggedIn: false, usageCount: 0, isSubscribed: false });
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  if (loading) {
    return (
      <div class="flex items-center justify-center h-screen">Loading...</div>
    );
  }

  return <ProcessMapper initialMaps={initialMaps} prefill={prefill} />;
}
