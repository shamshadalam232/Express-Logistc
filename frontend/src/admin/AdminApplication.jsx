
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [approvalNumber, setApprovalNumber] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [documentNo, setDocumentNo] = useState("");
  const [location, setLocation] = useState("");
  const [processingId, setProcessingId] = useState(null);

  // Fetch all applications
  const loadData = async () => {
    try {
      const res = await api.get("/admin/applications", {
        headers: {
          "admin-key": "12345",
        },
      });

      setApplications(res.data.data);
    } catch (err) {
  console.error("Load error message:", err.message);
  console.error("Error code:", err.code);
  console.error("HTTP status:", err.response?.status);
  console.error("Server response:", err.response?.data);
  console.error("Request URL:", err.config?.url);
  console.error("Base URL:", err.config?.baseURL);

  alert(
    err.response?.data?.message ||
    err.message ||
    "Failed to load applications"
  );
}
  };

  useEffect(() => {
    loadData();
  }, []);

  // Approve + Upload PDF
  const approveWithPdf = async (id) => {
    if (!selectedPdf || activeId !== id) {
      alert("Please select Approval PDF first");
      return;
    }

    if (!approvalNumber.trim()) {
      alert("Please enter Approval Number");
      return;
    }

    if (!confirm("Approve application & upload PDF?")) return;

    try {
      setProcessingId(id);

      const formData = new FormData();
      formData.append("pdf", selectedPdf);
      formData.append("approvalNumber", approvalNumber.trim());
      formData.append("fatherName", fatherName);
      formData.append("documentNo", documentNo);
      formData.append("location", location);

      await api.patch(`/admin/applications/${id}/approve`, formData, {
        headers: {
          "admin-key": "12345",
        },
      });

      setSelectedPdf(null);
      setActiveId(null);
      setApprovalNumber("");
      setFatherName("");
      setDocumentNo("");
      setLocation("");

      await loadData();
      alert("Application approved successfully!");
    } catch (err) {
      console.error("Approve error:", err);
      alert(
        err.response?.data?.message || "Failed to approve application"
      );
    } finally {
      setProcessingId(null);
    }
  };

  // Reject application
  const reject = async (id) => {
    if (!confirm("Reject this application?")) return;

    try {
      setProcessingId(id);

      await api.patch(
        `/admin/applications/${id}/reject`,
        {},
        {
          headers: {
            "admin-key": "12345",
          },
        }
      );

      await loadData();
    } catch (err) {
      console.error("Reject error:", err);
      alert(
        err.response?.data?.message || "Failed to reject application"
      );
    } finally {
      setProcessingId(null);
    }
  };

  // Delete application
  const remove = async (id) => {
    if (!confirm("Delete this application?")) return;

    try {
      setProcessingId(id);

      await api.delete(`/admin/applications/${id}`, {
        headers: {
          "admin-key": "12345",
        },
      });

      await loadData();
    } catch (err) {
      console.error("Delete error:", err);
      alert(
        err.response?.data?.message || "Failed to delete application"
      );
    } finally {
      setProcessingId(null);
    }
  };

  // Reusable application details
  const ApplicationDetails = ({ app }) => (
    <>
      <div className="flex justify-between gap-3 py-2 border-b border-gray-100">
        <span className="text-sm text-gray-500 shrink-0">Name</span>
        <span className="text-sm font-semibold text-gray-800 text-right break-words">
          {app.fullName || "-"}
        </span>
      </div>

      <div className="flex justify-between gap-3 py-2 border-b border-gray-100">
        <span className="text-sm text-gray-500 shrink-0">Mobile</span>
        <span className="text-sm font-medium text-gray-800 text-right break-all">
          {app.mobile || "-"}
        </span>
      </div>

      <div className="flex justify-between gap-3 py-2 border-b border-gray-100">
        <span className="text-sm text-gray-500 shrink-0">City</span>
        <span className="text-sm font-medium text-gray-800 text-right break-words">
          {app.city || "-"}
        </span>
      </div>

      <div className="flex justify-between gap-3 py-2 border-b border-gray-100">
        <span className="text-sm text-gray-500 shrink-0">Approval No.</span>
        <span className="text-sm font-medium text-gray-800 text-right break-all">
          {app.approvalNumber || "Not Generated"}
        </span>
      </div>

      <div className="flex justify-between gap-3 py-2 border-b border-gray-100">
        <span className="text-sm text-gray-500 shrink-0">Type</span>
        <span className="text-sm font-medium text-gray-800 text-right break-words">
          {app.franchiseType || "-"}
        </span>
      </div>

      <div className="flex justify-between items-center gap-3 pt-3">
        <span className="text-sm text-gray-500">Status</span>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            app.status === "Approved"
              ? "bg-green-100 text-green-700"
              : app.status === "Rejected"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {app.status}
        </span>
      </div>
    </>
  );

  // Reusable application actions
  const ApplicationActions = ({ app }) => (
    <div className="space-y-3">
      {app.status === "Pending" && (
        <div className="space-y-3 rounded-xl bg-gray-50 border border-gray-200 p-3 sm:p-4">
          <h3 className="font-semibold text-gray-800 text-sm">
            Approve Application
          </h3>

          <input
            type="text"
            placeholder="Approval Number *"
            aria-label="Approval Number"
            className="w-full min-w-0 px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={activeId === app._id ? approvalNumber : ""}
            onChange={(e) => {
              setActiveId(app._id);
              setApprovalNumber(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder="Father / Husband Name"
            aria-label="Father or Husband Name"
            className="w-full min-w-0 px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
            value={activeId === app._id ? fatherName : ""}
            onChange={(e) => {
              setActiveId(app._id);
              setFatherName(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder="Document No."
            aria-label="Document Number"
            className="w-full min-w-0 px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
            value={activeId === app._id ? documentNo : ""}
            onChange={(e) => {
              setActiveId(app._id);
              setDocumentNo(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder="Location"
            aria-label="Location"
            className="w-full min-w-0 px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
            value={activeId === app._id ? location : ""}
            onChange={(e) => {
              setActiveId(app._id);
              setLocation(e.target.value);
            }}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Approval PDF *
            </label>

            <input
              type="file"
              accept="application/pdf,.pdf"
              className="block w-full min-w-0 text-sm text-gray-600 file:mr-3 file:mb-2 file:px-3 file:py-2 file:rounded-lg file:border-0 file:bg-green-100 file:text-green-800 file:font-medium hover:file:bg-green-200"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file && file.type !== "application/pdf") {
                  alert("Please select a PDF file");
                  e.target.value = "";
                  setSelectedPdf(null);
                  setActiveId(app._id);
                  return;
                }

                setActiveId(app._id);
                setSelectedPdf(file || null);
              }}
            />

            {activeId === app._id && selectedPdf && (
              <p className="mt-2 text-xs text-green-700 break-all">
                Selected: {selectedPdf.name}
              </p>
            )}
          </div>

          <button
            disabled={
              processingId === app._id ||
              activeId !== app._id ||
              !selectedPdf
            }
            onClick={() => approveWithPdf(app._id)}
            className="w-full px-4 py-3 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {processingId === app._id
              ? "Processing..."
              : "Approve + Upload PDF"}
          </button>

          <button
            disabled={processingId === app._id}
            onClick={() => reject(app._id)}
            className="w-full px-4 py-3 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 disabled:opacity-50 transition"
          >
            Reject Application
          </button>
        </div>
      )}

      {app.status === "Approved" && app.approvalPdf && (
        <a
          href={app.approvalPdf}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-blue-200 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-100 transition"
        >
          View Approval PDF ↗
        </a>
      )}

      <button
        disabled={processingId === app._id}
        onClick={() => remove(app._id)}
        className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg text-sm font-semibold hover:bg-gray-900 disabled:opacity-50 transition"
      >
        {processingId === app._id ? "Processing..." : "Delete Application"}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20 sm:pt-24 pb-8">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
        {/* Page heading */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Applications
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage and review all applications
            </p>
          </div>

          <div className="self-start rounded-lg bg-white border border-gray-200 px-4 py-2">
            <span className="text-sm text-gray-500">Total: </span>
            <span className="font-bold text-gray-900">
              {applications.length}
            </span>
          </div>
        </div>

        {/* Loading / empty state */}
        {applications.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <p className="text-gray-500 text-sm">
              No applications found.
            </p>
          </div>
        ) : (
          <>
            {/* Mobile layout: application cards */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {applications.map((app) => (
                <div
                  key={app._id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                >
                  <div className="p-4">
                    <div className="mb-3">
                      <span className="text-xs text-gray-500">
                        Application
                      </span>

                      <h2 className="text-lg font-bold text-gray-900 break-words">
                        {app.fullName || "Unnamed Applicant"}
                      </h2>
                    </div>

                    <ApplicationDetails app={app} />
                  </div>

                  <div className="border-t border-gray-200 p-3 sm:p-4">
                    <ApplicationActions app={app} />
                  </div>
                </div>
              ))}
            </div>

            {/* Laptop / tablet layout: table */}
            <div className="hidden md:block bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-4 text-sm font-semibold text-gray-700">
                        Name
                      </th>
                      <th className="px-4 py-4 text-sm font-semibold text-gray-700">
                        Mobile
                      </th>
                      <th className="px-4 py-4 text-sm font-semibold text-gray-700">
                        City
                      </th>
                      <th className="px-4 py-4 text-sm font-semibold text-gray-700">
                        Approval No.
                      </th>
                      <th className="px-4 py-4 text-sm font-semibold text-gray-700">
                        Type
                      </th>
                      <th className="px-4 py-4 text-sm font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="px-4 py-4 text-sm font-semibold text-gray-700 min-w-[280px]">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {applications.map((app) => (
                      <tr
                        key={app._id}
                        className="border-t border-gray-200 align-top hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-4 text-sm font-medium text-gray-800">
                          {app.fullName || "-"}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-700">
                          {app.mobile || "-"}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-700">
                          {app.city || "-"}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-700 break-all">
                          {app.approvalNumber || "Not Generated"}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-700">
                          {app.franchiseType || "-"}
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                              app.status === "Approved"
                                ? "bg-green-100 text-green-700"
                                : app.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>

                        <td className="px-4 py-4 min-w-[280px]">
                          <ApplicationActions app={app} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
