import { authClient } from "@/lib/auth";
import type { User } from "@/types";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface AuthContextType {
	user: User | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
	const [neonUser, setNeonUser] = useState<any>(null);

	useEffect(() => {
		async function loadUser() {
			try {
				const result = await authClient.getSession();

				if (result && result.data?.user) {
					setNeonUser(result.data.user);
				} else {
					setNeonUser(null);
				}
			} catch (error) {
				console.log(error);
				setNeonUser(null);
			}
		}

		loadUser();

		return () => {};
	}, []);

	return <AuthContext.Provider value={{ user: neonUser }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
}
