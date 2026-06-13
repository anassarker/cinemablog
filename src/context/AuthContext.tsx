import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import type { AuthContextType, User } from "../types";

const ADMIN_EMAIL = (
  import.meta.env.VITE_ADMIN_EMAIL || "chatgptgo606@gmail.com"
).toLowerCase();

const IDLE_TIMEOUT = 2 * 60 * 60 * 1000; // 2 hours

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const logout = useCallback(async () => {
    try {
      const { auth } = await import("../config/firebase");
      const { signOut } = await import("firebase/auth");
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
    sessionStorage.removeItem("cineblog_admin");
    setUser(null);
  }, []);

  const resetIdleTimer = useCallback(() => {
    if (idleTimer.current) {
      clearTimeout(idleTimer.current);
    }
    idleTimer.current = setTimeout(() => {
      logout();
    }, IDLE_TIMEOUT);
  }, [logout]);

  useEffect(() => {
    if (!user) return;

    const events = [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
    ];

    events.forEach((event) =>
      document.addEventListener(event, resetIdleTimer)
    );
    resetIdleTimer();

    return () => {
      events.forEach((event) =>
        document.removeEventListener(event, resetIdleTimer)
      );
      if (idleTimer.current) {
        clearTimeout(idleTimer.current);
      }
    };
  }, [user, resetIdleTimer]);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const initAuth = async () => {
      try {
        const { auth } = await import("../config/firebase");
        const { onAuthStateChanged } = await import("firebase/auth");

        unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          if (
            firebaseUser &&
            firebaseUser.email?.toLowerCase() === ADMIN_EMAIL
          ) {
            const authUser: User = {
              uid: firebaseUser.uid,
              email: firebaseUser.email ?? "",
              displayName: firebaseUser.displayName ?? "",
            };
            setUser(authUser);
            sessionStorage.setItem(
              "cineblog_admin",
              JSON.stringify(authUser)
            );
          } else {
            // Not the admin email — treat as not logged in
            if (firebaseUser) {
              // Someone else's Firebase account — sign them out silently
              import("firebase/auth").then(({ signOut }) =>
                signOut(auth)
              );
            }
            const stored = sessionStorage.getItem("cineblog_admin");
            if (stored) {
              try {
                const parsed: User = JSON.parse(stored);
                // Also validate stored session against admin email
                if (parsed.email?.toLowerCase() === ADMIN_EMAIL) {
                  setUser(parsed);
                } else {
                  sessionStorage.removeItem("cineblog_admin");
                  setUser(null);
                }
              } catch {
                sessionStorage.removeItem("cineblog_admin");
                setUser(null);
              }
            } else {
              setUser(null);
            }
          }
          setLoading(false);
        });
      } catch (error) {
        console.error("Firebase init error:", error);
        const stored = sessionStorage.getItem("cineblog_admin");
        if (stored) {
          try {
            const parsed: User = JSON.parse(stored);
            if (parsed.email?.toLowerCase() === ADMIN_EMAIL) {
              setUser(parsed);
            } else {
              sessionStorage.removeItem("cineblog_admin");
            }
          } catch {
            sessionStorage.removeItem("cineblog_admin");
          }
        }
        setLoading(false);
      }
    };

    initAuth();

    return () => {
      unsubscribe?.();
    };
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    if (email.toLowerCase() !== ADMIN_EMAIL) {
      throw new Error("Unauthorized email");
    }

    const { auth } = await import("../config/firebase");
    const { signInWithEmailAndPassword } = await import("firebase/auth");

    const result = await signInWithEmailAndPassword(auth, email, password);

    const loggedUser: User = {
      uid: result.user.uid,
      email: result.user.email ?? "",
      displayName: result.user.displayName ?? "",
    };

    setUser(loggedUser);
    sessionStorage.setItem(
      "cineblog_admin",
      JSON.stringify(loggedUser)
    );
  };

  // Only the configured admin email is admin
  const isAdmin =
    !!user && user.email?.toLowerCase() === ADMIN_EMAIL;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};

export default AuthContext;
