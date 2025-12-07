export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-black to-neutral-900 text-gray-100 px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-10 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-gray-400">
          NOBU BASE
        </p>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
          NOBU BASE
        </h1>

        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Apps / Thoughts / Experiments
        </p>

        <nav className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
          <a
            href="/nobulog/apps"
            className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition"
          >
            Apps
          </a>
          <a
            href="/nobulog/blog"
            className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition"
          >
            Blog
          </a>
          <a
            href="/nobulog/about"
            className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition"
          >
            About
          </a>
        </nav>
      </div>
    </main>
  );
}
