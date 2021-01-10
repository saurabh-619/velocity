import Head from "next/head";
import SiteEmptyState from "@/components/SiteEmptyState";
import SiteTable from "@/components/SiteTable";
import DashboardShell from "@/components/DashboardShell";
import SiteTableHeader from "./../components/SiteTableHeader";
import SiteTableSkeleton from "./../components/SiteTableSkelaton";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

export default function Dashboard() {
  const { data } = useSWR("/api/sites", fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }
  if (data?.sites?.length) {
    return (
      <DashboardShell>
        <SiteTableHeader
        // isPaidAccount={isPaidAccount}
        />
        {data.sites && <SiteTable sites={data?.sites} />}
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <SiteTableHeader
      //   isPaidAccount={isPaidAccount}
      />
      <SiteEmptyState />
    </DashboardShell>
  );
}
