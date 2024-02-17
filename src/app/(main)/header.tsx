import { User } from "@supabase/supabase-js";
import Link from "next/link";

function Header() {
  return (
    <header className="fixed left-0 top-0 w-full bg-white">
      <div className="flex items-center justify-between px-2 py-2 md:px-4">
        <Link href="/dashboard">
          <h1 className="text-2xl font-semibold">
            <small>Tiny</small>Habits
          </h1>
        </Link>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/habits">Habits</Link>
            </li>
            <li>
              <Link href="/settings">Settings</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
