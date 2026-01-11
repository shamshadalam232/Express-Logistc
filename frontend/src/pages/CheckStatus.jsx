import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { api } from "../lib/axios";

export default function CheckStatus() {
  const [approval, setApproval] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const checkStatus = async () => {
    if (!approval || !mobile) {
      Swal.fire("Error", "Fill all fields", "error");
      return;
    }

    try {
      // ✅ backend verify
      const res = await api.post("/user/checkapplication", {
        approval,
        mobile,
      });

      // ✅ save data securely (NOT in URL)
      sessionStorage.setItem(
        "applicationData",
        JSON.stringify(res.data)
      );

      Swal.fire("Success", "Login Successful", "success");

      // ✅ clean URL (no mobile / approval)
      navigate("/status/dashboard");
    } catch (err) {
      console.log(err)
      Swal.fire(
        "Error",
        "Invalid Approval Number or Mobile",
        "error"
      );
    }
  };

  return (
    <>
      <div className="max-w-full mx-auto p-10 mt-10 bg-gray-100 pt-10">
        <h1 className="text-2xl font-bold text-center mb-4">
          Check Application Status
        </h1>

        <input
          className="border p-3 w-full mb-3 rounded"
          placeholder="Approval Number"
          value={approval}
          onChange={(e) => setApproval(e.target.value)}
        />

        <input
          className="border p-3 w-full mb-3 rounded"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <button
          onClick={checkStatus}
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Check Status
        </button>
      </div>

      <div>
        <img src="/bus.jpg"
        className="w-full rounded-2xl object-cover h-45"
        />
      </div>
    </>
  );
}
