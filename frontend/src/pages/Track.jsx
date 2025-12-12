import { useState } from "react";
import { api } from "../lib/axios";

export default function Track() {
  const [Id, setTrackingId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const trackOrder = async () => {
    if (!Id) {
      alert("Please enter Tracking ID");
      return;
    }

    setLoading(true);
    try {
      const res = await api.get(`/user/track/${Id}`);
      setData(res.data);
    } catch (err) {
      console.log(err)
      alert("No shipment found for this Tracking ID");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="max-w-full mx-auto p-10 mt-10 bg-gray-600 pt-10">

      <h1 className="text-3xl font-bold text-center mb-6">
        Track Your Order
      </h1>

      {/* Tracking Input */}
      <input
        className="border p-3 w-full mb-3 rounded"
        placeholder="Enter Tracking ID"
        value={Id}
        onChange={(e) => setTrackingId(e.target.value)}
      />

      <button
        onClick={trackOrder}
        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
      >
        {loading ? "Tracking..." : "Track Order"}
      </button>

      {/* Tracking Result */}
      {data && (
        <div className="mt-6 p-4 border rounded shadow bg-gray-50">

          <h2 className="text-xl font-bold text-blue-700 mb-2">
            Tracking ID: {data.trackingId}
          </h2>

          <p><b>Customer Name:</b> {data.customerName}</p>
          <p><b>Mobile:</b> {data.mobile}</p>
          <p><b>Pickup:</b> {data.pickupAddress}</p>
          <p><b>Delivery:</b> {data.deliveryAddress}</p>
          <p><b>Status:</b> {data.status}</p>

          <h3 className="font-bold text-lg mt-4 mb-1">Shipment Timeline:</h3>

          {data.timeline?.length > 0 ? (
            <div className="space-y-2">
              {data.timeline.map((t, i) => (
                <div
                  key={i}
                  className="border-l-4 border-blue-600 pl-3 py-1 bg-white rounded"
                >
                  <p className="font-semibold">{t.status}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(t.date).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No updates available.</p>
          )}
        </div>
      )}
    </div>

    <div className="max-w-full mx-auto p-5 pt-10">
      <img
      src="/bus.jpg"
      />
    </div>
    </>
  );
}

