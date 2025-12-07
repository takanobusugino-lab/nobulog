export default function Home() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-10 text-center">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
          nobulog
        </h1>

        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Apps / Thoughts / Experiments
        </p>

        <nav className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mt-6 sm:mt-8">
          <a
            href="/nobulog/apps"
            className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition inline-flex items-center justify-center w-full sm:w-auto"
          >
            Apps
          </a>
          <a
            href="/nobulog/blog"
            className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition inline-flex items-center justify-center w-full sm:w-auto"
          >
            Blog
          </a>
          <a
            href="/nobulog/about"
            className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition inline-flex items-center justify-center w-full sm:w-auto"
          >
            About
          </a>
        </nav>
      </div>
    </main>
  );
}
