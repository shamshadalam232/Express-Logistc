import { useEffect, useState } from "react";
import { api } from "../lib/axios";

export default function AdminShipments() {
  const [shipments, setShipments] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);

  // -----------------------------------
  // Fetch All Shipments
  // -----------------------------------
  const loadShipments = async () => {
    try {
      const res = await api.get("/admin/shipments", {
        headers: { "admin-key": "12345" }
      });
      setShipments(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load shipments");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
        await loadShipments();
    }
    fetchData();
  }, []);

  // -----------------------------------
  // Add or Update Shipment
  // -----------------------------------
  const saveShipment = async () => {
    try {
      if (editingId) {
        await api.put(`/admin/shipments/${editingId}`, form, {
          headers: {  "admin-key": "12345" }
        });
        alert("Shipment Updated");
      } else {
        await api.post("/admin/shipments", form, {
          headers: {  "admin-key": "12345" }
        });
        alert("Shipment Added");
      }

      setForm({});
      setEditingId(null);
      loadShipments();
    } catch (err) {
      console.log(err);
      alert("Error saving shipment");
    }
  };

  // -----------------------------------
  // Delete Shipment
  // -----------------------------------
  const remove = async (id) => {
    if (!confirm("Delete this shipment?")) return;

    try {
      await api.delete(`/admin/shipments/${id}`, {
        headers: {  "admin-key": "12345" }
      });

      alert("Shipment Deleted");
      loadShipments();
    } catch (err) {
      console.log(err);
      alert("Error deleting shipment");
    }
  };

  // -----------------------------------
  // Edit Shipment (Fill form)
  // -----------------------------------
  const edit = (ship) => {
    setEditingId(ship._id);
    setForm(ship);
  };

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Shipments</h1>

      {/* ---------- ADD / EDIT FORM ---------- */}
      <div className="bg-gray-100 p-5 rounded mb-8 shadow">
        <h2 className="text-xl font-semibold mb-3">
          {editingId ? "Edit Shipment" : "Add Shipment"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          <input className="border p-2 rounded" placeholder="Tracking ID"
            value={form.trackingId || ""}
            onChange={(e) => setForm({ ...form, trackingId: e.target.value })}
          />

          <input className="border p-2 rounded" placeholder="Customer Name"
            value={form.customerName || ""}
            onChange={(e) => setForm({ ...form, customerName: e.target.value })}
          />

          <input className="border p-2 rounded" placeholder="Mobile"
            value={form.mobile || ""}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          />

          <input className="border p-2 rounded" placeholder="Pickup Address"
            value={form.pickupAddress || ""}
            onChange={(e) => setForm({ ...form, pickupAddress: e.target.value })}
          />

          <input className="border p-2 rounded" placeholder="Delivery Address"
            value={form.deliveryAddress || ""}
            onChange={(e) => setForm({ ...form, deliveryAddress: e.target.value })}
          />

          <input className="border p-2 rounded" placeholder="Product Details"
            value={form.productDetails || ""}
            onChange={(e) => setForm({ ...form, productDetails: e.target.value })}
          />

          <select
            className="border p-2 rounded"
            value={form.status || ""}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Picked">Picked</option>
            <option value="In Transit">In Transit</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>

        </div>

        <button
          onClick={saveShipment}
          className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
        >
          {editingId ? "Update Shipment" : "Add Shipment"}
        </button>
      </div>

      {/* ---------- SHIPMENTS TABLE ---------- */}
      <table className="w-full border">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-2">Tracking ID</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Mobile</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {shipments.map((s) => (
            <tr key={s._id} className="border text-center">
              <td className="p-2">{s.trackingId}</td>
              <td className="p-2">{s.customerName}</td>
              <td className="p-2">{s.mobile}</td>
              <td className="p-2">{s.status}</td>

              <td className="p-2 flex gap-2 justify-center">
                <button
                  onClick={() => edit(s)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => remove(s._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
