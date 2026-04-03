import { useAuth } from "@/context/auth-context";
import { RedirectToSignIn, SignedIn } from "@neondatabase/neon-js/auth/react";

export default function Onboarding() {
	const { user } = useAuth();

	if (!user) return <RedirectToSignIn />;

	return (
		<SignedIn>
			<div className="min-h-screen px-6 pt-24 pb-12">
				<div className="mx-auto max-w-xl"></div>
			</div>
		</SignedIn>
	);
}
