import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StepProgress from "../components/StepProgress";
import Swal from "sweetalert2";

export default function StatusDashboard() {
  const navigate = useNavigate();

  const [data] = useState(() => {
    const saved = sessionStorage.getItem("applicationData");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (!data) {
      navigate("/status");
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Login Successfully!",
      text: data.fullName,
    });
  }, [data, navigate]);

  if (!data) return null;

 const handlePdfDownload = () => {
    if (data.approvalPdf) {
      let pdfUrl = data.approvalPdf;
      
      // Fix localhost URLs to production
      if (pdfUrl.includes('localhost')) {
        const cloudinaryMatch = pdfUrl.match(/(https:\/\/res\.cloudinary\.com\/[^\s]+)/);
        if (cloudinaryMatch) {
          pdfUrl = cloudinaryMatch[1];
        }
      }
      
      // For mobile compatibility - use Google Docs Viewer or direct link
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Option 1: Google Docs Viewer (works on all mobiles)
        // window.open(`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`, '_blank');
        
        // Option 2: Direct download with proper content-type
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.download = `Approval_${data.approvalNumber}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Desktop - open in new tab
        window.open(pdfUrl, '_blank');
      }
    } else {
      Swal.fire('Error', 'Approval PDF not available', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-green-600 mb-4 mt-10">
          Application No: {data.approvalNumber}
        </h2>

        <div className="bg-gray-100 px-4 py-3 font-semibold">
          Application Details
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <tbody>

              <Row label="Application No." value={data.approvalNumber} />
              <Row label="Document No." value={data.documentNo || "N/A"} />

              <Row label="Application Name" value={data.fullName} />
              <Row label="Father / Husband Name" value={data.fatherName || "N/A"} />

              <Row label="Email" value={data.email} />
              <Row label="Mobile" value={data.mobile} />

              <Row
                label="Pin Code"
                value={
                  <span className="text-green-600 font-semibold">
                    {data.pincode} / Approved
                  </span>
                }
              />

              <Row label="State" value={data.state} />

              <Row label="Franchise Type" value={data.franchiseType} />

              <Row
                label="Status"
                value={
                  <span className="text-green-600 font-semibold">
                    {data.status}
                  </span>
                }
              />

              <tr className="border-t">
                <td className="p-3 font-semibold w-1/4 bg-gray-50">
                  Approved Location
                </td>
                <td colSpan="3" className="p-3">
                  {data.location || "N/A"}
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        <div className="max-w-6xl mx-auto mt-10 px-4">

      {/* Heading */}
      <h2 className="text-center text-lg md:text-xl font-semibold mb-4">
        Fashnear Technologies Private Limited Bank Details
      </h2>

      {/* Bank Table */}
      <div className="overflow-x-auto border rounded-md">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">Account Number</th>
              <th className="border p-3">IFSC Code</th>
              <th className="border p-3">Branch Name</th>
              <th className="border p-3">Bank Name</th>
            </tr>
          </thead>
          
        </table>
      </div>

      {/* Approval Letter Section */}
      <div className="mt-4 bg-[#1f2428] flex flex-col md:flex-row items-center justify-between px-4 py-3 rounded">
        <span className="text-white font-medium mb-2 md:mb-0">
          Approval Letter
        </span>

        <a
          onClick={handlePdfDownload}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2 rounded font-semibold text-sm"
        >
          Approval Letter Download
        </a>
      </div>

    </div>
      


        {/* STEP BAR */}
        <StepProgress status={data.status} />

        {/* PDF */}
        <a
         onClick={handlePdfDownload}
          className="inline-block mt-6 bg-yellow-500 text-white px-5 py-2 rounded"
        >
          Download Approval Letter
        </a>

        {/* MAP */}
        <div className="mt-10">
          <iframe
            className="w-full h-80 rounded"
            src={`https://www.google.com/maps?q=${data.city},${data.state}&output=embed`}
          />
        </div>
      </div>
    </div>
  );
}


function Row({ label, value }) {
  return (
    <tr className="border-t">
      <td className="p-3 font-semibold bg-gray-50 w-1/4">{label}</td>
      <td className="p-3 w-1/4">{value}</td>
    </tr>
  );
}

