import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import styles from "./admin.module.css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();

  return (
    <div className={styles.adminLayout}>
      {session && (
        <aside className={styles.adminSidebar}>
          <div className={styles.sidebarHeader}>
            <h3>Lentone Admin</h3>
          </div>
          <nav className={styles.sidebarNav}>
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/content">Page Content</Link>
            <Link href="/admin/products">Products</Link>
            <Link href="/api/auth/signout" className={styles.logoutBtn}>Logout</Link>
          </nav>
        </aside>
      )}
      <main className={styles.adminMain}>
        {children}
      </main>
    </div>
  );
}
