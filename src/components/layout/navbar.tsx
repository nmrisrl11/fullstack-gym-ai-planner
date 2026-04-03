import { cn } from "@/lib/utils";
import { Dumbbell01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";

export default function Navbar() {
	const user = false;

	return (
		<header className="fixed top-0 right-0 left-0 z-50 border-b bg-background/80 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
				<Link to="/" className="flex items-center gap-2">
					<HugeiconsIcon icon={Dumbbell01Icon} className="size-6 text-brand-accent" />
					<span className="text-lg font-semibold">GymAI</span>
				</Link>

				<nav>
					{user ? (
						<>
							<Link
								to="/profile"
								className={cn(
									buttonVariants({
										variant: "ghost",
									}),
									"rounded-md",
								)}
							>
								My Plan
							</Link>
						</>
					) : (
						<>
							<Link
								to="/auth/sign-in"
								className={cn(
									buttonVariants({
										variant: "ghost",
									}),
									"rounded-md",
								)}
							>
								Sign In
							</Link>

							<Link
								to="/auth/sign-up"
								className={cn(
									buttonVariants(),
									"rounded-md bg-brand-accent hover:bg-brand-accent-hover",
								)}
							>
								Sign Up
							</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	);
}
