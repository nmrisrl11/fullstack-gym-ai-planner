import { authClient } from "@/lib/auth";
import { NeonAuthUIProvider } from "@neondatabase/neon-js/auth/react";
import type { ReactNode } from "react";

export default function NeonAuthProvider({ children }: { children: ReactNode }) {
	return (
		<NeonAuthUIProvider emailOTP authClient={authClient}>
			{children}
		</NeonAuthUIProvider>
	);
}
