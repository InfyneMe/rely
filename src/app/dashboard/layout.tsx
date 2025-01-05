import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="dashboard-container min-h-screen">
        <header className="p-4 text-dark container mx-auto flex justify-between items-center mt-5">
            <h1 className="text-2xl font-bold ml-4">
              <Link href="/dashboard">Relyx</Link>
            </h1>
            <nav className="flex space-x-8 justify-center items-center ">
                <h1 className="cursor-pointer text-bold hover:text-blue-500 transition">
                    <Link href="/dashboard">Home</Link>
                </h1>
                <h1 className="cursor-pointer hover:text-blue-500 transition">
                    <Link href="/dashboard/alerts">Alerts</Link>
                </h1>
                <h1 className="cursor-pointer hover:text-blue-500 transition">Blogs</h1>
                <h1 className="cursor-pointer hover:text-blue-500 transition">FAQs</h1>
            </nav>
        </header>
        <main className="p-6">{children}</main>
      </div>
    );
}
  