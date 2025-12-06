export default function Home() {
  return (
    <main className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">nobulog</h1>

      <p className="text-gray-300">
        Apps / Thoughts / Experiments  
        <br />by Nobu Sugino
      </p>

      <nav className="space-y-3 mt-10">
        <p><a href="/nobulog/apps">→ Apps</a></p>
        <p><a href="/nobulog/blog">→ Blog</a></p>
        <p><a href="/nobulog/about">→ About</a></p>
      </nav>
    </main>
  );
}
