import { AdminDashboardMetrics } from "@/components/modules/dashboard/adminMeta/AdminDashboardMetrics";
import { getMeta } from "@/services/metaService";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "View your Application performance and analytics",
};

const AdminHomePage = async () => {
  const { data } = await getMeta();

  return (
    <div className="container mx-auto px-4 py-6">
      <AdminDashboardMetrics data={data} />
    </div>
  );
};

export default AdminHomePage;
