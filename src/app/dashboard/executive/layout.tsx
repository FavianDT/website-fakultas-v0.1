import { DashboardLayout } from "@/components/shared/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="executive">{children}</DashboardLayout>;
}
