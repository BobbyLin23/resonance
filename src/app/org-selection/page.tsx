import { OrganizationList } from "@clerk/nextjs";

import { clerkAppearanceBase } from "@/lib/clerk-appearance";

export default function OrgSelectionPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <OrganizationList
        hidePersonal
        afterCreateOrganizationUrl="/"
        afterSelectOrganizationUrl="/"
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
