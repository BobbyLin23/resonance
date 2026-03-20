import { SignIn } from "@clerk/nextjs";

import { clerkAppearanceBase } from "@/lib/clerk-appearance";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SignIn
        appearance={{
          ...clerkAppearanceBase,
          elements: {
            rootBox: "mx-auto",
            card: "shadow-lg",
          },
        }}
      />
    </div>
  );
}
