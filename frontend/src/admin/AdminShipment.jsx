
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { Package, Plus, Pencil, Trash2, X, Truck } from "lucide-react";

const initialForm = {
  trackingId: "",
  customerName: "",
  mobile: "",
  pickupAddress: "",
  deliveryAddress: "",
  productDetails: "",
  status: "",
};

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-800",
  Picked: "bg-blue-100 text-blue-800",
  "In Transit": "bg-indigo-100 text-indigo-800",
  "Out for Delivery": "bg-orange-100 text-orange-800",
  Delivered: "bg-green-100 text-green-800",
};

export default function AdminShipments() {
  const [shipments, setShipments] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch all shipments
  const loadShipments = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/shipments", {
        headers: { "admin-key": "12345" },
      });

      setShipments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Load shipments error:", err);
      alert("Failed to load shipments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShipments();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset form
  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  // Add or update shipment
  const saveShipment = async (e) => {
    e.preventDefault();

    if (!form.trackingId.trim()) {
      alert("Please enter Tracking ID");
      return;
    }

    if (!form.customerName.trim()) {
      alert("Please enter Customer Name");
      return;
    }

    try {
      setSaving(true);

      if (editingId) {
        await api.put(`/admin/shipments/${editingId}`, form, {
          headers: { "admin-key": "12345" },
        });

        alert("Shipment Updated Successfully");
      } else {
        await api.post("/admin/shipments", form, {
          headers: { "admin-key": "12345" },
        });

        alert("Shipment Added Successfully");
      }

      resetForm();
      await loadShipments();
    } catch (err) {
      console.error("Save shipment error:", err);

      alert(
        err.response?.data?.message || "Error saving shipment"
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete shipment
  const remove = async (id) => {
    if (!confirm("Are you sure you want to delete this shipment?")) {
      return;
    }

    try {
      setDeletingId(id);

      await api.delete(`/admin/shipments/${id}`, {
        headers: { "admin-key": "12345" },
      });

      setShipments((prev) => prev.filter((s) => s._id !== id));

      if (editingId === id) {
        resetForm();
      }

      alert("Shipment Deleted Successfully");
    } catch (err) {
      console.error("Delete shipment error:", err);

      alert(
        err.response?.data?.message || "Error deleting shipment"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Edit shipment
  const edit = (ship) => {
    setEditingId(ship._id);

    setForm({
      trackingId: ship.trackingId || "",
      customerName: ship.customerName || "",
      mobile: ship.mobile || "",
      pickupAddress: ship.pickupAddress || "",
      deliveryAddress: ship.deliveryAddress || "",
      productDetails: ship.productDetails || "",
      status: ship.status || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Status badge
  const StatusBadge = ({ status }) => (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${
        statusStyles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status || "Not Set"}
    </span>
  );

  // Shipment action buttons
  const ActionButtons = ({ shipment }) => (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => edit(shipment)}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-amber-100 px-3 py-2.5 text-sm font-semibold text-amber-800 transition hover:bg-amber-200 sm:flex-none"
      >
        <Pencil size={16} />
        Edit
      </button>

      <button
        type="button"
        disabled={deletingId === shipment._id}
        onClick={() => remove(shipment._id)}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-100 px-3 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-200 disabled:opacity-50 sm:flex-none"
      >
        <Trash2 size={16} />
        {deletingId === shipment._id ? "Deleting..." : "Delete"}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-10 sm:pt-24">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-5 lg:px-8">

        {/* Page Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="rounded-xl bg-blue-100 p-2.5 text-blue-700">
                <Truck size={24} />
              </div>

              <span className="text-sm font-semibold text-blue-700">
                ADMIN DASHBOARD
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Manage Shipments
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Add, update and manage shipment details.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="rounded-lg bg-blue-50 p-2 text-blue-700">
              <Package size={22} />
            </div>

            <div>
              <p className="text-xs text-slate-500">Total Shipments</p>
              <p className="text-xl font-bold text-slate-900">
                {shipments.length}
              </p>
            </div>
          </div>
        </div>

        {/* Add / Edit Form */}
        <section
          id="shipment-form"
          className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
            <div className="rounded-lg bg-blue-100 p-2 text-blue-700">
              {editingId ? <Pencil size={20} /> : <Plus size={22} />}
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                {editingId ? "Edit Shipment" : "Add New Shipment"}
              </h2>

              <p className="text-xs text-slate-500 sm:text-sm">
                {editingId
                  ? "Update the shipment information below."
                  : "Enter the details to create a shipment."}
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
              >
                <X size={16} />
                <span className="hidden sm:inline">Cancel</span>
              </button>
            )}
          </div>

          <form onSubmit={saveShipment} className="p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {/* Tracking ID */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Tracking ID <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="trackingId"
                  placeholder="Enter tracking ID"
                  value={form.trackingId}
                  onChange={handleChange}
                  required
                  className="w-full min-w-0 rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Customer Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Customer Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="customerName"
                  placeholder="Enter customer name"
                  value={form.customerName}
                  onChange={handleChange}
                  required
                  className="w-full min-w-0 rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Mobile Number
                </label>

                <input
                  type="tel"
                  name="mobile"
                  placeholder="Enter mobile number"
                  value={form.mobile}
                  onChange={handleChange}
                  className="w-full min-w-0 rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Pickup Address / Establish Date */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Establish Date
                </label>

                <input
                  type="text"
                  name="pickupAddress"
                  placeholder="Enter establish date"
                  value={form.pickupAddress}
                  onChange={handleChange}
                  className="w-full min-w-0 rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Delivery Address / End Date */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  End Date
                </label>

                <input
                  type="text"
                  name="deliveryAddress"
                  placeholder="Enter end date"
                  value={form.deliveryAddress}
                  onChange={handleChange}
                  className="w-full min-w-0 rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Product Details */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Product Details
                </label>

                <input
                  type="text"
                  name="productDetails"
                  placeholder="Enter product details"
                  value={form.productDetails}
                  onChange={handleChange}
                  className="w-full min-w-0 rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Status */}
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Shipment Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Picked">Picked</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>

            {/* Form Buttons */}
            <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {editingId ? <Pencil size={17} /> : <Plus size={19} />}

                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Shipment"
                  : "Add Shipment"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={saving}
                  className="w-full rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 sm:w-auto"
                >
                  Cancel Editing
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Shipments Section Header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              All Shipments
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              View and manage your shipment records.
            </p>
          </div>

          <button
            type="button"
            onClick={loadShipments}
            disabled={loading}
            className="shrink-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {/* Loading State */}
        {loading && shipments.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-sm text-slate-500">
              Loading shipments...
            </p>
          </div>
        ) : shipments.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <Package size={28} />
            </div>

            <h3 className="text-lg font-semibold text-slate-800">
              No Shipments Found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Add your first shipment using the form above.
            </p>
          </div>
        ) : (
          <>
            {/* MOBILE: Shipment Cards */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {shipments.map((s) => (
                <article
                  key={s._id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  {/* Card Header */}
                  <div className="flex items-start gap-3 border-b border-slate-100 p-4">
                    <div className="shrink-0 rounded-xl bg-blue-50 p-3 text-blue-700">
                      <Package size={23} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-slate-500">
                        Tracking ID
                      </p>

                      <h3 className="mt-1 break-all text-base font-bold text-slate-900">
                        {s.trackingId || "-"}
                      </h3>

                      <p className="mt-1 break-words text-sm text-slate-600">
                        {s.customerName || "-"}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <StatusBadge status={s.status} />
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="space-y-3 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-sm text-slate-500">
                        Mobile
                      </span>

                      <span className="break-all text-right text-sm font-medium text-slate-800">
                        {s.mobile || "-"}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <span className="shrink-0 text-sm text-slate-500">
                        Establish Date
                      </span>

                      <span className="break-words text-right text-sm font-medium text-slate-800">
                        {s.pickupAddress || "-"}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <span className="shrink-0 text-sm text-slate-500">
                        End Date
                      </span>

                      <span className="break-words text-right text-sm font-medium text-slate-800">
                        {s.deliveryAddress || "-"}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <span className="shrink-0 text-sm text-slate-500">
                        Product
                      </span>

                      <span className="break-words text-right text-sm font-medium text-slate-800">
                        {s.productDetails || "-"}
                      </span>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="border-t border-slate-100 bg-slate-50 p-3">
                    <ActionButtons shipment={s} />
                  </div>
                </article>
              ))}
            </div>

            {/* TABLET / LAPTOP: Table */}
            <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-4 py-4 text-sm font-semibold">
                        Tracking ID
                      </th>

                      <th className="px-4 py-4 text-sm font-semibold">
                        Customer
                      </th>

                      <th className="px-4 py-4 text-sm font-semibold">
                        Mobile
                      </th>

                      <th className="px-4 py-4 text-sm font-semibold">
                        Status
                      </th>

                      <th className="px-4 py-4 text-sm font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {shipments.map((s) => (
                      <tr
                        key={s._id}
                        className="border-t border-slate-100 transition hover:bg-slate-50"
                      >
                        <td className="px-4 py-4 text-sm font-semibold text-slate-800">
                          <span className="break-all">
                            {s.trackingId || "-"}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-sm text-slate-700">
                          {s.customerName || "-"}
                        </td>

                        <td className="px-4 py-4 text-sm text-slate-700">
                          {s.mobile || "-"}
                        </td>

                        <td className="px-4 py-4">
                          <StatusBadge status={s.status} />
                        </td>

                        <td className="px-4 py-4">
                          <ActionButtons shipment={s} />
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

