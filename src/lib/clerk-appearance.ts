import { shadcn } from "@clerk/ui/themes";

/** Clerk shadcn theme: uses app CSS variables (--card, --primary, …) and follows `.dark`. */
export const clerkAppearanceBase = {
  theme: shadcn,
} as const;
