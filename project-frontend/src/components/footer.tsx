import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-8 py-4 border-t border-slate-200 bg-slate-50">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4 text-sm text-slate-600">
        {/* Left side: tagline */}
        <p className="mb-2 sm:mb-0">
          Built with <span className="text-red-500">♥</span> using React, TypeScript & Supabase
        </p>

        {/* Right side: GitHub link */}
        <a
          href="https://github.com/hhhhernyi/height-project"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:text-indigo-600 transition-colors"
        >
          <FaGithub size={20} />
          <span>View on GitHub</span>
        </a>
      </div>
    </footer>
  );
}
