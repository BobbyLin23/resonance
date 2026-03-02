import { PageHeader } from "../page-header";
import { DashboardHeader } from "./dashboard-header";
import { HeroPattern } from "./hero-pattern";
import { QuickActionsPanel } from "./quick-action-panel";
import { TextInputPanel } from "./text-input-panel";

export const DashboardView = () => {
  return (
    <div className="relative">
      <PageHeader title="Dashboard" className="lg:hidden" />
      <HeroPattern />
      <div className="relative space-y-8 p-4 lg:p-16">
        <DashboardHeader />
        <TextInputPanel />
        <QuickActionsPanel />
      </div>
    </div>
  );
};
