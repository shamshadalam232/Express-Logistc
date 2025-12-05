import { useState } from "react";
import { api } from "../lib/axios";

export default function CheckStatus() {
  const [approval, setApproval] = useState("");
  const [mobile, setMobile] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    if (!approval || !mobile) {
      alert("Please fill both fields");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/user/checkapplication", {
       approval,
        mobile,
      });

      setData(res.data);
    } catch (err) {
      console.log(err)
      alert("No details found for this Approval Number & Mobile.");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="max-w-full mx-auto p-10 mt-10 bg-red-300">

      <h1 className="text-3xl font-bold text-center mb-6">
        Check Application Status
      </h1>

      {/* Approval Number */}
      <input
        className="border p-3 w-full mb-3 rounded"
        placeholder="Enter Approval Number"
        value={approval}
        onChange={(e) => setApproval(e.target.value)}
      />

      {/* Mobile Number */}
      <input
        className="border p-3 w-full mb-3 rounded"
        placeholder="Enter Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />

      <button
        onClick={checkStatus}
        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
      >
        {loading ? "Checking..." : "Check Status"}
      </button>

      {/* Result */}
      {data && (
        <div className="mt-6 p-4 border rounded shadow bg-gray-50">

          <h2 className="text-xl font-bold text-green-700 mb-2">
            Application Status: {data.status}
          </h2>

          <p><b>Name:</b> {data.fullName}</p>
          <p><b>Approval Number:</b> {data.approvalNumber}</p>
          <p><b>Mobile:</b> {data.mobile}</p>
          <p><b>Franchise Type:</b> {data.franchiseType}</p>
          <p><b>City:</b> {data.city}</p>
          <p><b>State:</b> {data.state}</p>

          <p className="mt-3 text-sm text-gray-600">
            Applied On: {new Date(data.createdAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>

    <div className="max-w-screen rounded-md mx-auto p-5 pt-10">
      <img 
       src="src/assets/photo6.png"
      />
    </div>

</>

  );
}
