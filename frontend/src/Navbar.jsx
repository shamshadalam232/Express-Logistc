import { useState } from "react";
import logo from "/photo5.jpg"; // <-- your logo

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#022a63] fixed w-full top-0 z-50 shadow">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">

        {/* ---- Logo Section ---- */}
        <a href="/" className="flex items-center gap-3">
          <img
            src={logo}
            className="h-10 w-auto md:h-14 object-contain"
            alt="Logo"
          />
          <span className="text-white text-2xl font-semibold hidden md:block">
            EXPRESS
          </span>
        </a>

        {/* ---- Hamburger Button ---- */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* ---- Desktop Menu ---- */}
        <ul className="hidden md:flex gap-8 text-white text-lg font-medium">
          <li><a href="/" className="hover:text-blue-300">Home</a></li>
          <li><a href="/status" className="hover:text-blue-300">Check Status</a></li>
          <li><a href="/track" className="hover:text-blue-300">Track Order</a></li>
          <li><a href="/about" className="hover:text-blue-300">About</a></li>
          <li><a href="https://mail.zoho.in/signup?type=org&plan=newMail5gb" className="hover:text-blue-300" onClick={() => setOpen(false)}>Webmail</a></li>
        </ul>

      </div>

      {/* ---- Mobile Menu ---- */}
      {open && (
        <div className="md:hidden bg-[#022a63] px-6 pb-4 animate-slideDown">
          <ul className="flex flex-col gap-4 text-white text-lg">
            <li><a href="/" onClick={() => setOpen(false)}>Home</a></li>
            <li><a href="/status" onClick={() => setOpen(false)}>Check Status</a></li>
            <li><a href="/track" onClick={() => setOpen(false)}>Track Order</a></li>
            <li><a href="/about" onClick={() => setOpen(false)}>About</a></li>
            <li><a href="/contact" onClick={() => setOpen(false)}>Contact Us</a></li>
            <li><a href="https://mail.zoho.in/signup?type=org&plan=newMail5gb" onClick={() => setOpen(false)}>Webmail</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
