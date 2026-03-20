"use client";

import { OrganizationSwitcher, UserButton, useClerk } from "@clerk/nextjs";
import {
  AudioLinesIcon,
  HeadphonesIcon,
  HomeIcon,
  LayoutGridIcon,
  type LucideIcon,
  SettingsIcon,
  Volume2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { clerkAppearanceBase } from "@/lib/clerk-appearance";
import { UsageContainer } from "../billing/usage-container";
import { ModeToggle } from "../mode-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "../ui/sidebar";
import { Skeleton } from "../ui/skeleton";
import { VoiceCreateDialog } from "../voices/voice-create-dialog";

interface MenuItem {
  title: string;
  url?: string;
  icon: LucideIcon;
  onClick?: () => void;
}

interface NavSectionProps {
  label?: string;
  items: MenuItem[];
  pathname: string;
}

function NavSection({ label, items, pathname }: NavSectionProps) {
  return (
    <SidebarGroup>
      {label && (
        <SidebarGroupLabel className="text-[13px] uppercase text-muted-foreground">
          {label}
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                render={
                  item.url
                    ? (props) => <Link {...props} href={item.url as string} />
                    : undefined
                }
                isActive={
                  item.url
                    ? item.url === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.url)
                    : false
                }
                onClick={item.onClick}
                className="h-9 px-3 py-2 text-[13px] tracking-tight font-medium border border-transparent data-[active=true]:border-border data-[active=true]:shadow-[0px_1px_1px_0px_rgba(44,54,53,0.03),inset_0px_0px_0px_2px_var(--background)] dark:data-[active=true]:shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25),inset_0px_0px_0px_2px_var(--background)]"
              >
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const clerk = useClerk();

  const [voiceDialogOpen, setVoiceDialogOpen] = useState(false);

  const mainMenuItems: MenuItem[] = [
    {
      title: "Dashboard",
      url: "/",
      icon: HomeIcon,
    },
    {
      title: "Explore voices",
      url: "/voices",
      icon: LayoutGridIcon,
    },
    {
      title: "Text to speech",
      url: "/text-to-speech",
      icon: AudioLinesIcon,
    },
    {
      title: "Voice cloning",
      icon: Volume2Icon,
      onClick: () => setVoiceDialogOpen(true),
    },
  ];

  const othersMenuItems: MenuItem[] = [
    {
      title: "Settings",
      icon: SettingsIcon,
      onClick: () => clerk.openOrganizationProfile(),
    },
    {
      title: "Help and support",
      url: "mailto:business@codewithantonio.com",
      icon: HeadphonesIcon,
    },
  ];

  return (
    <>
      <VoiceCreateDialog
        open={voiceDialogOpen}
        onOpenChange={setVoiceDialogOpen}
      />
      <Sidebar collapsible="icon">
        <SidebarHeader className="flex flex-col gap-4 pt-4">
          <div className="flex items-center gap-2 pl-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:pl-0">
            <Image
              src="/logo.svg"
              alt="Resonance"
              width={24}
              height={24}
              className="rounded-sm"
            />
            <span className="group-data-[collapsible=icon]:hidden font-semibold text-lg tracking-tighter text-foreground">
              Resonance
            </span>
            <ModeToggle />
            <SidebarTrigger className="ml-auto lg:hidden" />
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              <OrganizationSwitcher
                hidePersonal
                fallback={
                  <Skeleton className="h-8.5 w-full group-data-[collapsible=icon]:size-8 rounded-md border bg-card" />
                }
                appearance={{
                  ...clerkAppearanceBase,
                  elements: {
                    rootBox:
                      "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!",
                    organizationSwitcherTrigger:
                      "w-full! justify-between! bg-card! border! border-border! rounded-md! pl-1! pr-2! py-1! gap-3! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! shadow-[0px_1px_1.5px_0px_rgba(44,54,53,0.03)]! dark:shadow-[0px_1px_1.5px_0px_rgba(0,0,0,0.2)]!",
                    organizationPreview: "gap-2!",
                    organizationPreviewAvatarBox: "size-6! rounded-sm!",
                    organizationPreviewTextContainer:
                      "text-xs! tracking-tight! font-medium! text-foreground! group-data-[collapsible=icon]:hidden!",
                    organizationPreviewMainIdentifier: "text-[13px]!",
                    organizationSwitcherTriggerIcon:
                      "size-4! text-sidebar-foreground! group-data-[collapsible=icon]:hidden!",
                  },
                }}
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <div className="border-b border-dashed border-border" />
        <SidebarContent>
          <NavSection items={mainMenuItems} pathname={pathname} />
          <NavSection
            label="Others"
            items={othersMenuItems}
            pathname={pathname}
          />
        </SidebarContent>
        <div className="border-b border-dashed border-border" />
        <SidebarFooter className="gap-3 py-3">
          <UsageContainer />
          <SidebarMenu>
            <SidebarMenuItem>
              <UserButton
                showName
                fallback={
                  <Skeleton className="h-8.5 w-full group-data-[collapsible=icon]:size-8 rounded-md border border-border bg-card" />
                }
                appearance={{
                  ...clerkAppearanceBase,
                  elements: {
                    rootBox:
                      "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!",
                    userButtonTrigger:
                      "w-full! justify-between! bg-card! border! border-border! rounded-md! pl-1! pr-2! py-1! shadow-[0px_1px_1.5px_0px_rgba(44,54,53,0.03)]! dark:shadow-[0px_1px_1.5px_0px_rgba(0,0,0,0.2)]! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! group-data-[collapsible=icon]:after:hidden! [--border:color-mix(in_srgb,transparent,var(--clerk-color-neutral,#000000)_15%)]!",
                    userButtonBox: "flex-row-reverse! gap-2!",
                    userButtonOuterIdentifier:
                      "text-[13px]! tracking-tight! font-medium! text-foreground! pl-0! group-data-[collapsible=icon]:hidden!",
                    userButtonAvatarBox: "size-6!",
                  },
                }}
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  );
};
