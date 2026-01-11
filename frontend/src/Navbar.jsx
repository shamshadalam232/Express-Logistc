import { useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "/logo1.jpg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // 👇 Check if page is admin route
  const isAdminPage = location.pathname.startsWith("/admin");

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
            FASHNER
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

          {/* ⭐ Webmail only for admin routes */}
          {isAdminPage && (
            <li>
              <a 
                href="https://mail.hostinger.com/" 
                target="_blank"
                className="hover:text-blue-300"
              >
                Webmail
              </a>
            </li>
          )}
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

            {/* ⭐ Webmail only inside mobile menu for admin pages */}
            {isAdminPage && (
              <li>
                <a 
                  href="https://mail.hostinger.com/"
                  target="_blank"
                  onClick={() => setOpen(false)}
                >
                  Webmail
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
