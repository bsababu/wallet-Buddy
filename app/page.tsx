import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <header className="navbar">
        <div className="navbar-start px-3"><Link href="/">LOGO </Link></div>
        <div className="navbar-end">
          <div className="px-4"><Link href="#log">LOGIN</Link></div>
          <div className="px-4"><Link href="#About">About</Link></div>
          <div className="px-4"><Link href="#contact">Contact</Link></div>
          <div className="px-4"><Link href="#Block">Blog</Link></div>
        </div>
      </header>
    </main>
  );
}
