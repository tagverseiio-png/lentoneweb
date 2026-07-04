import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import styles from "./admin.module.css";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-playfair)", color: "var(--navy)", marginBottom: 24 }}>Welcome to Lentone Admin</h1>
      <div className={styles.dashboardCard}>
        <h3>Quick Stats</h3>
        <p>Use the sidebar to navigate to the Content Editor or Product Manager.</p>
        <p style={{ marginTop: 16 }}><strong>Note on Images:</strong> When updating images, please paste a direct URL (e.g., from an image hosting service or an existing public link). We will integrate a dedicated image upload widget in a future update.</p>
      </div>
    </div>
  );
}
