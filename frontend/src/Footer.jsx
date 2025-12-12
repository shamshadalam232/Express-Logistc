export default function Footer() {
  return (
    <footer className="bg-slate-500 text-black mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo + About */}
        <div>
          <h1 className="text-2xl font-bold mb-3">Express</h1>
          <p className="text-gray-300 text-sm leading-6">
            We provide reliable and fast logistics services across India.
            Partner with us for seamless delivery experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Quick Links</h2>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Track Order</li>
            <li className="hover:text-white cursor-pointer">Check Status</li>
            <li className="hover:text-white cursor-pointer">Join Us</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Company</h2>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-white cursor-pointer">Support</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Contact Us</h2>
          <ul className="space-y-2 text-gray-300">
            <li>Email: shamshadalam@expresslogistic.shop</li>
            <li>Phone: +91 9876- ----6</li>
            <li>Address: 36, 100 Feet Rd, opposite Marks & Spencer, Vivek Nagar, Chandra Reddy Layout, S T Bed Layout, Koramangala, Bengaluru, Karnataka,India</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-500 text-center py-4 text-gray-300 text-sm">
        © {new Date().getFullYear()} Express Logistics — All Rights Reserved.
      </div>
    </footer>
  );
}
