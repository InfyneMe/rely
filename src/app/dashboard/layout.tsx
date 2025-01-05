import '../globals.css'; // Or the correct path to your globals.css

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-container min-h-screen">
      <header className="p-4 text-dark container mx-auto flex justify-between items-center mt-5">
        <h1 className="text-2xl font-bold ml-4">
          <a href="/dashboard">Relyx</a>
        </h1>
        <nav className="flex space-x-8 justify-center items-center">
          <a href="/dashboard" className="cursor-pointer hover:text-blue-500 transition">Home</a>
          <a href="/dashboard/alerts" className="cursor-pointer hover:text-blue-500 transition">Alerts</a>
          <a href="/dashboard/blogs" className="cursor-pointer hover:text-blue-500 transition">Blogs</a>
          <a href="/dashboard/faqs" className="cursor-pointer hover:text-blue-500 transition">FAQs</a>
        </nav>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
