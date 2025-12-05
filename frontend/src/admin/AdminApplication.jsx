import { useEffect, useState } from "react";
import { api } from "../lib/axios";

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);

  // Fetch all applications
 const loadData = async () => {
    const res = await api.get("/admin/applications", {
        headers: {
            "admin-key": "12345"
        }
    });
    setApplications(res.data.data);
  };

  useEffect(() => {
    const fetchData = async () => {
        await loadData();
    }
    fetchData();
  }, []);


  // Approve Application
  const approve = async (id) => {
  if (!confirm("Approve this application?")) return;

  await api.patch(
    `/admin/applications/${id}/approve`,
    {},
    {
      headers: {
        "admin-key": "12345"  // <-- IMPORTANT
      }
    }
  );

  loadData();
};

  // Reject Application
  const reject = async (id) => {
    if (!confirm("Reject this application?")) return;

    await api.patch(`/admin/applications/${id}/reject`,
    {},
    {
      headers: {
        "admin-key": "12345"  // <-- IMPORTANT
      }
    }
  );
    loadData();
  };

  // Delete Application
  const remove = async (id) => {
    if (!confirm("Delete this application?")) return;

    await api.delete(`/admin/applications/${id}`, {
      headers: {
        "admin-key": "12345"  // <-- IMPORTANT
      }
    }
  );
    loadData();
  };

  return (
    <div className="p-6 mt-20">
      <h1 className="text-3xl font-bold mb-6">Applications</h1>

      <div className="overflow-x-auto shadow border rounded-lg">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">City</th>
              <th className="p-3">Approval No.</th>
              <th className="p-3">Type</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-t">
                <td className="p-3">{app.fullName}</td>
                <td className="p-3">{app.mobile}</td>
                <td className="p-3">{app.city}</td>
                <td>{app.approvalNumber || "Not Generated"}</td>
                <td className="p-3">{app.franchiseType}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-white 
                      ${
                        app.status === "Approved"
                          ? "bg-green-600"
                          : app.status === "Rejected"
                          ? "bg-red-600"
                          : "bg-yellow-500"
                      }`}
                  >
                    {app.status}
                  </span>
                </td>

                <td className="p-3 space-x-2">

                  {app.status === "Pending" && (
                    <>
                      <button
                        onClick={() => approve(app._id)}
                        className="px-3 py-1 bg-green-600 text-white rounded"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => reject(app._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => remove(app._id)}
                    className="px-3 py-1 bg-gray-700 text-white rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
