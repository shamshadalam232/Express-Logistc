import React from "react";
import { useState } from "react";
import Modal from "../components/Modal";
import JoinForm from "../components/JoinForm";

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="w-full bg-gradient-to-r from-[#0A3C6E] to-[#003D73] text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-4xl font-semibold mb-10 mt-10">
            A trusted partner in simplifying logistics
          </h1>

          <button
            className="bg-white text-blue-900 font-medium px-6 py-2 rounded mt-2 hover:bg-gray-400 transition"
            onClick={() => setOpen(true)}
          >
            Apply Now
          </button>
          <Modal open={open} onClose={() => setOpen(false)}>
            <JoinForm onClose={() => setOpen(false)} />
          </Modal>

          <div className="mt-10">
            <img src="/moto.jpg"
              alt="Delivery Rider"
              className="w-full rounded-2xl object-cover h-80"
            />
          </div>
        </div>
      </div>

      <div className="w-full bg-sky-950 text-white py-7">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl font-semibold mt-5 px-3">
            We ensure seamless logistics with reliability you can trust.
          </h1>
          <p className="mt-3 px-1">
            Our mission is to simplify end-to-end logistics, offering fast,
            efficient, and cost-effective delivery solutions designed to add
            real value to your business.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
            {/* box 1 */}
            <div className="bg-[#E5F5FF] text-[#022B52] p-6 rounded-xl text-center shadow h-40">
              <h2 className="text-2xl font-semibold mt-5">9 Lac+</h2>
              <p className="text-sm mt-1">Orders shipped per day</p>
            </div>

            {/* Box 2 */}
            <div className="bg-[#E5F5FF] text-[#022B52] p-6 rounded-xl text-center shadow h-40">
              <h2 className="text-2xl font-semibold mt-5">30k+</h2>
              <p className="text-sm mt-1">Delivery executives</p>
            </div>

            {/* Box 3 */}
            <div className="bg-[#E5F5FF] text-[#022B52] p-6 rounded-xl text-center shadow h-40">
              <h2 className="text-2xl font-semibold mt-5">3k+</h2>
              <p className="text-sm mt-1">Partners</p>
            </div>

            {/* Box 4 */}
            <div className="bg-[#E5F5FF] text-[#022B52] p-6 rounded-xl text-center shadow h-40">
              <h2 className="text-2xl font-semibold mt-5">6k+</h2>
              <p className="text-sm mt-1">PIN codes served</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white text-white py-7">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 px-4">
            <div>
              <img
                src="/man.jpg"
                alt="Delivery Rider"
                className="w-full rounded-2xl object-cover h-80"
              />
            </div>

            <div className="bg-white-200 p-6 rounded-xl shadow h-85">
              <div className="text-black">
                <h1 className="text-center text-2xl font-semibold mt-3 px-3 mb-3">
                  Become a part of our delivery team
                </h1>
                <li>
                  Sign up to do both pick-up and delivery services across India.
                </li>
                <li>
                  Register to start handling pick-ups and deliveries anywhere in
                  India.
                </li>
                <li>
                  Enjoy flexible working hours, steady earnings, and the chance
                  to make every customer’s experience better.
                </li>
                <li>
                  More than 30,000 partners have already built their journey
                  with us.
                </li>
                <li>
                  Join us and be a part of India’s rapidly expanding logistics
                  community.
                </li>
                <button
                  className="bg-blue-800 text-blue-100 font-medium px-6 py-2 rounded mt-2 hover:bg-gray-400 transition"
                  onClick={() => setOpen(true)}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white text-white py-7">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 px-4">
           <div className="bg-white-200 p-6 rounded-xl shadow h-85">
              <div className="text-black">
                <h1 className="text-center text-2xl font-semibold mt-3 px-3 mb-3">
                  Become a part of our delivery team
                </h1>
                <li>
                  Start offering pick-up and delivery services across India with
                  complete flexibility.
                </li>
                <li>
                  Earn consistently while helping create a reliable and smooth
                  delivery experience for customers.
                </li>
                <li>Our program has empowered over 30,000+ partners so far.</li>
                <li>
                  More than 30,000 partners have already built their journey
                  with us.
                </li>
                <button
                  className="bg-blue-800 text-blue-100 font-medium px-6 py-2 rounded mt-2 hover:bg-gray-400 transition text-center"
                  onClick={() => setOpen(true)}
                >
                  Apply Now
                </button>
              </div>
            </div>
          
            <div>
              <img
                src="/group.jpg"
                alt="Delivery Rider"
                className="w-full rounded-2xl object-cover h-80"
              />
            </div>           
        </div>
      </div>
      </div>
    </>
  );
}
