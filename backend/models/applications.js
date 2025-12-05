import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String },
  mobile: { type: String, required: true },
  pincode: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String },
  franchiseType: { type: String, required: true },
  status: { type: String, default: "Pending" }, // Admin changes
  createdAt: { type: Date, default: Date.now },
  approvalNumber: { type: String, default: null}
});

export default mongoose.model("Application", applicationSchema);
