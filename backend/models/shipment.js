import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema({
  trackingId: 
      { type: String, required: true, unique: true },
  customerName:
       { type: String, required: true },
  mobile:
       { type: String, required: true },
  pickupAddress:
       { type: String, required: true },
  deliveryAddress:
       { type: String, required: true },
  productDetails:
       { type: String },
  status:
       { type: String, default: "Pending" },

  // For timeline history
  timeline: [
    {
      status: String,
      location: String,
      date: { type: Date, default: Date.now }
    }
  ],

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Shipment", shipmentSchema);
