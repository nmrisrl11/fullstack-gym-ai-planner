import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import type { UserProfile } from "@/types";
import { ArrowRight02Icon, LoaderCircle } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { RedirectToSignIn, SignedIn } from "@neondatabase/neon-js/auth/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
	goal: string;
	experience: string;
	daysPerWeek: string;
	sessionLength: string;
	equipment: string;
	injuries: string;
	preferredSplit: string;
}

const goalOptions = [
	{ value: "bulk", label: "Build Muscle (Bulk)" },
	{ value: "cut", label: "Lose Fat (Cut)" },
	{ value: "recomp", label: "Body Recomposition" },
	{ value: "strength", label: "Build Strength" },
	{ value: "endurance", label: "Improve Endurance" },
];

const experienceOptions = [
	{ value: "beginner", label: "Beginner (0-1 years)" },
	{ value: "intermediate", label: "Intermediate (1-3 years)" },
	{ value: "advanced", label: "Advanced (3+ years)" },
];

const daysOptions = [
	{ value: "2", label: "2 days per week" },
	{ value: "3", label: "3 days per week" },
	{ value: "4", label: "4 days per week" },
	{ value: "5", label: "5 days per week" },
	{ value: "6", label: "6 days per week" },
];

const sessionOptions = [
	{ value: "30", label: "30 minutes" },
	{ value: "45", label: "45 minutes" },
	{ value: "60", label: "60 minutes" },
	{ value: "90", label: "90 minutes" },
];

const equipmentOptions = [
	{ value: "full_gym", label: "Full Gym Access" },
	{ value: "home", label: "Home Gym" },
	{ value: "dumbbells", label: "Dumbbells Only" },
];

const splitOptions = [
	{ value: "full_body", label: "Full Body" },
	{ value: "upper_lower", label: "Upper/Lower Split" },
	{ value: "ppl", label: "Push/Pull/Legs" },
	{ value: "custom", label: "Let AI Decide" },
];

const selectBaseClassName =
	"relative overflow-hidden rounded-md border border-input shadow-xs transition-[color,box-shadow] outline-none focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-aria-invalid:border-destructive has-aria-invalid:ring-destructive/20 has-[input:is(:disabled)]:*:pointer-events-none dark:has-aria-invalid:ring-destructive/40";

export default function Onboarding() {
	const { user, saveProfile, generatePlan } = useAuth();

	const [formData, setFormData] = useState<FormData>({
		goal: "bulk",
		experience: "intermediate",
		daysPerWeek: "4",
		sessionLength: "60",
		equipment: "full_gym",
		injuries: "",
		preferredSplit: "upper_lower",
	});

	const [isGenerating, setIsGenerating] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	if (!user) return <RedirectToSignIn />;

	function updateForm(field: keyof FormData, value: string | null) {
		setFormData((prev) => ({ ...prev, [field]: value }));
	}

	async function handleQuestionnaire(e: React.SubmitEvent) {
		e.preventDefault();

		const profileData: Omit<UserProfile, "userId" | "updatedAt"> = {
			goal: formData.goal as UserProfile["goal"],
			experience: formData.experience as UserProfile["experience"],
			daysPerWeek: parseInt(formData.daysPerWeek),
			sessionLength: parseInt(formData.sessionLength),
			equipment: formData.equipment as UserProfile["equipment"],
			injuries: formData.injuries || undefined,
			preferredSplit: formData.preferredSplit as UserProfile["preferredSplit"],
		};

		try {
			saveProfile(profileData);
			setIsGenerating(true);
			await generatePlan();
			navigate("/profile");
		} catch (error) {
			setError(error instanceof Error ? error.message : "Failed to save profile");
		} finally {
			setIsGenerating(false);
		}
	}

	return (
		<SignedIn>
			<div className="min-h-screen px-6 pt-24 pb-12">
				<div className="mx-auto max-w-xl">
					{!isGenerating ? (
						<Card>
							<CardHeader>
								<CardTitle className="text-2xl font-bold">Tell us about yourself</CardTitle>
								<CardDescription className="text-base">
									Help us create the perfect plan for you.
								</CardDescription>
							</CardHeader>

							<CardContent>
								<form className="space-y-3" onSubmit={handleQuestionnaire}>
									<div className={cn(selectBaseClassName)}>
										<label
											className="block px-3 py-2 text-xs font-medium text-foreground"
											htmlFor="goalOptions"
										>
											What's your primary goal?
										</label>

										<Select
											value={formData.goal}
											onValueChange={(value) => updateForm("goal", value)}
										>
											<SelectTrigger
												className="w-full rounded-t-md rounded-b-none border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0"
												id="goalOptions"
											>
												<span>
													{goalOptions.find((o) => o.value === formData.goal)?.label ||
														"Select Primary Goal"}
												</span>
											</SelectTrigger>

											<SelectContent alignItemWithTrigger={false} className="rounded-md p-3">
												{goalOptions.map((item) => {
													return (
														<SelectItem value={item.value} key={item.value}>
															{item.label}
														</SelectItem>
													);
												})}
											</SelectContent>
										</Select>
									</div>

									<div className={cn(selectBaseClassName)}>
										<label
											className="block px-3 py-2 text-xs font-medium text-foreground"
											htmlFor="experienceOptions"
										>
											Training experience
										</label>

										<Select
											value={formData.experience}
											onValueChange={(value) => updateForm("experience", value)}
										>
											<SelectTrigger
												className="w-full rounded-t-md rounded-b-none border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0"
												id="experienceOptions"
											>
												<span>
													{experienceOptions.find((o) => o.value === formData.experience)?.label ||
														"Select Training Experience"}
												</span>
											</SelectTrigger>

											<SelectContent alignItemWithTrigger={false} className="rounded-md p-3">
												{experienceOptions.map((item) => {
													return (
														<SelectItem value={item.value} key={item.value}>
															{item.label}
														</SelectItem>
													);
												})}
											</SelectContent>
										</Select>
									</div>

									<div className="grid gap-3 lg:grid-cols-2">
										<div className={cn(selectBaseClassName)}>
											<label
												className="block px-3 py-2 text-xs font-medium text-foreground"
												htmlFor="daysOptions"
											>
												Days per week
											</label>

											<Select
												value={formData.daysPerWeek}
												onValueChange={(value) => updateForm("daysPerWeek", value)}
											>
												<SelectTrigger
													className="w-full rounded-t-md rounded-b-none border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0"
													id="daysOptions"
												>
													<span>
														{daysOptions.find((o) => o.value === formData.daysPerWeek)?.label ||
															"Select Days per Week"}
													</span>
												</SelectTrigger>

												<SelectContent alignItemWithTrigger={false} className="rounded-md p-3">
													{daysOptions.map((item) => {
														return (
															<SelectItem value={item.value} key={item.value}>
																{item.label}
															</SelectItem>
														);
													})}
												</SelectContent>
											</Select>
										</div>

										<div className={cn(selectBaseClassName)}>
											<label
												className="block px-3 py-2 text-xs font-medium text-foreground"
												htmlFor="sessionOptions"
											>
												Session length
											</label>

											<Select
												value={formData.sessionLength}
												onValueChange={(value) => updateForm("sessionLength", value)}
											>
												<SelectTrigger
													className="w-full rounded-t-md rounded-b-none border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0"
													id="sessionOptions"
												>
													<span>
														{sessionOptions.find((o) => o.value === formData.sessionLength)
															?.label || "Select Session Length"}
													</span>
												</SelectTrigger>

												<SelectContent alignItemWithTrigger={false} className="rounded-md p-3">
													{sessionOptions.map((item) => {
														return (
															<SelectItem value={item.value} key={item.value}>
																{item.label}
															</SelectItem>
														);
													})}
												</SelectContent>
											</Select>
										</div>
									</div>

									<div className={cn(selectBaseClassName)}>
										<label
											className="block px-3 py-2 text-xs font-medium text-foreground"
											htmlFor="equipmentOptions"
										>
											Equipment access
										</label>

										<Select
											value={formData.equipment}
											onValueChange={(value) => updateForm("equipment", value)}
										>
											<SelectTrigger
												className="w-full rounded-t-md rounded-b-none border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0"
												id="equipmentOptions"
											>
												<span>
													{equipmentOptions.find((o) => o.value === formData.equipment)?.label ||
														"Select Equipment"}
												</span>
											</SelectTrigger>

											<SelectContent alignItemWithTrigger={false} className="rounded-md p-3">
												{equipmentOptions.map((item) => {
													return (
														<SelectItem value={item.value} key={item.value}>
															{item.label}
														</SelectItem>
													);
												})}
											</SelectContent>
										</Select>
									</div>

									<div className={cn(selectBaseClassName)}>
										<label
											className="block px-3 py-2 text-xs font-medium text-foreground"
											htmlFor="splitOptions"
										>
											Preferred training split
										</label>

										<Select
											value={formData.preferredSplit}
											onValueChange={(value) => updateForm("preferredSplit", value)}
										>
											<SelectTrigger
												className="w-full rounded-t-md rounded-b-none border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0"
												id="splitOptions"
											>
												<span>
													{splitOptions.find((o) => o.value === formData.preferredSplit)?.label ||
														"Select Preferred Training Split"}
												</span>
											</SelectTrigger>

											<SelectContent alignItemWithTrigger={false} className="rounded-md p-3">
												{splitOptions.map((item) => {
													return (
														<SelectItem value={item.value} key={item.value}>
															{item.label}
														</SelectItem>
													);
												})}
											</SelectContent>
										</Select>
									</div>

									<div className="mt-6 space-y-3">
										<Label htmlFor="injuries">Any injuries or limitations? (optional)</Label>
										<Textarea
											className="field-sizing-content max-h-29.5 min-h-0 resize-none rounded-md bg-transparent text-sm"
											id="injuries"
											placeholder="E.g., lower back issues, shoulder impingement..."
											value={formData.injuries}
											onChange={(e) => updateForm("sessionLength", e.target.value)}
										/>
									</div>

									<Button
										type="submit"
										className="w-full rounded-xl bg-brand-accent hover:bg-brand-accent-hover"
									>
										Generate My Plan
										<HugeiconsIcon icon={ArrowRight02Icon} data-icon="inline-end" />
									</Button>
								</form>
							</CardContent>
						</Card>
					) : (
						<Card>
							<CardHeader className="text-center">
								<HugeiconsIcon
									icon={LoaderCircle}
									className="mx-auto mb-3 size-12 animate-spin text-brand-accent"
								/>

								<CardTitle className="text-2xl font-bold">Creating your Plan</CardTitle>
								<CardDescription className="text-base">
									Our AI is building your personalized training program...
								</CardDescription>
							</CardHeader>
						</Card>
					)}
				</div>
			</div>
		</SignedIn>
	);
}
