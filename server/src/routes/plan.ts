import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma";

export const planRouter = Router();

planRouter.post("/generate", async (req: Request, res: Response) => {
	try {
		const { userId } = req.body;

		if (!userId) {
			return res.status(400).json({ error: "Use ID is required" });
		}

		const profile = await prisma.user_profiles.findUnique({
			where: { user_id: userId },
		});

		if (!profile) {
			return res.status(400).json({ error: "User profile not found. Complete onboarding first." });
		}
	} catch (error) {
		console.log(`Error generating plan: ${error}`);
		res.status(500).json({ error: "Failed to generate plan" });
	}
});
