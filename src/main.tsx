import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@/providers/theme-provider.tsx";
import NeonAuthProvider from "./providers/neon-auth-provider.tsx";
import AuthProvider from "./context/auth-context.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider>
			<NeonAuthProvider>
				<AuthProvider>
					<App />
				</AuthProvider>
			</NeonAuthProvider>
		</ThemeProvider>
	</StrictMode>,
);
