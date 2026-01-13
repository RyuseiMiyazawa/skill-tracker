import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white shadow-2xl border-b border-purple-500/20">
      <div className="container mx-auto px-4 py-5">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-300 transition-all duration-300">
            ⚡ Skill Tracker
          </Link>
          <nav>
            <Link
              href="/add"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 inline-block"
            >
              + Add Skill
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
