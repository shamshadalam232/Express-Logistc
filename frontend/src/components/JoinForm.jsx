import { useState } from "react";
import { api } from "../lib/axios";

export default function JoinForm({ onClose }) {
  const [form, setForm] = useState({});

  const submit = async () => {
    await api.post("/user/apply", form);
    alert("Application Submitted!");
    onClose();
  };

  return (
    <div className="text-black">
      <h2 className="text-2xl font-bold mb-4">Join Us</h2>

      <input className="border p-2 w-full mb-2" placeholder="Full Name"
        onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
      
      <input className="border p-2 w-full mb-2" placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })} />
      
      <input className="border p-2 w-full mb-2" placeholder="Mobile"
        onChange={(e) => setForm({ ...form, mobile: e.target.value })} />

      <input className="border p-2 w-full mb-2" placeholder="Pincode"
        onChange={(e) => setForm({ ...form, pincode: e.target.value })} />

      <input className="border p-2 w-full mb-2" placeholder="City"
        onChange={(e) => setForm({ ...form, city: e.target.value })} />

      <input className="border p-2 w-full mb-2" placeholder="State"
        onChange={(e) => setForm({ ...form, state: e.target.value })} />

      <input className="border p-2 w-full mb-2" placeholder="District"
        onChange={(e) => setForm({ ...form, district: e.target.value })} />

      <input className="border p-2 w-full mb-2" placeholder="Franchise Type"
        onChange={(e) => setForm({ ...form, franchiseType: e.target.value })} />

      <button 
        className="bg-blue-600 text-white px-4 py-2 mt-2 w-full" 
        onClick={submit}
      >
        Submit
      </button>
    </div>
  );
}
