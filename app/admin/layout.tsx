// Admin layout — intentionally excludes the global Header and Footer
// so the admin panel has its own full-screen sidebar layout.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
