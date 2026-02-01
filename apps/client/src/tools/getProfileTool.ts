import { toolDefinition } from "@tanstack/ai";
import z from "zod";
import { getProfile } from "@/server/cv/profile.server";

export const getProfileTool = () => toolDefinition({
  name: 'get_profile',
  description: 'Get Thomas Newman\'s professional profile',
    inputSchema: z.object({}),
    outputSchema: z.object({
      name: z.string(),
      title: z.string(),
      location: z.string(),
      email: z.string(),
      phone: z.string(),
      linkedin: z.string(),
      website: z.string(),
      yearsExperience: z.number(),
      consultingExperience: z.number(),
      specialization: z.string(),
    }),
}).server(async () => await getProfile());