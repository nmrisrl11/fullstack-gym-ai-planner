import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/navbar";
import Account from "./pages/account";
import Auth from "./pages/auth";
import Home from "./pages/home";
import Onboarding from "./pages/onboarding";
import Profile from "./pages/profile";

export function App() {
	return (
		<BrowserRouter>
			<div className="flex min-h-screen flex-col">
				<Navbar />
				<main className="flex-1">
					<Routes>
						<Route index element={<Home />} />
						<Route path="/onboarding" element={<Onboarding />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/auth/:pathname" element={<Auth />} />
						<Route path="/account/:pathname" element={<Account />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
