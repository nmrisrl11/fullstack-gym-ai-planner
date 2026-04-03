import { useAuth } from "@/context/auth-context";
import { Navigate } from "react-router-dom";

export default function Home() {
	const { user, isLoading } = useAuth();

	if (user && !isLoading) return <Navigate to="/profile" replace />;

	return <h1>Home</h1>;
}
