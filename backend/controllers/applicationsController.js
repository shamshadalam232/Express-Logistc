import Application from "../models/applications.js";
import { sendMail } from "../utils/sendMail.js";
import { getViewablePdfUrl } from "../config/cloudinary.js";

// POST : user apply
export const applyApplications = async (req, res) => {
  try {
    const applications = await Application.create(req.body);

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: applications,
    });
  } catch (error) {
    console.error("applyApplications error:", error);
    res.status(500).json({
      message: "Server error while submitting application",
    });
  }
};

// GET : admin fetch all applications
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find();

    res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error("getApplications error:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching applications" });
  }
};

export const approveApplication = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "Approval PDF is required" });
    }

    const approvalNumber =
      "VAL-APP-" + Math.floor(100000 + Math.random() * 900000);

    const pdfUrl = getViewablePdfUrl(req.file.path);

    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      {
        status: "Approved",
        approvalNumber,
        approvalPdf: pdfUrl,
      },
      {
        new: true,
        runValidators: false, // 🔥 MOST IMPORTANT
      }
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Email optional
    if (updatedApplication.email) {
      sendMail({
        to: updatedApplication.email,
        subject: "Application Approved",
        html: `
          <h2>Hello ${updatedApplication.fullName}</h2>
          <p>Your application has been <b>approved</b>.</p>
          <p><b>Approval Number:</b> ${approvalNumber}</p>
        `,
      }).catch(console.error);
    }

    return res.json({
      success: true,
      message: "Application approved successfully",
      data: updatedApplication,
    });

  } catch (err) {
    console.error("❌ APPROVE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

export const checkApplicationStatus = async (req, res) => {
  try {
    const { approval, mobile } = req.body;

    const app = await Application.findOne({
      approvalNumber: approval,
      mobile: mobile,
    }).lean();

    if (!app) return res.status(404).json({ message: "No Application Found" });

    res.json(app);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const rejectApplication = async (req, res) => {
  const updated = await Application.findByIdAndUpdate(
    req.params.id,
    { status: "Rejected" },
    { new: true }
  );
  res.json(updated);
};

export const deleteApplication = async (req, res) => {
  await Application.findByIdAndDelete(req.params.id);
  res.json({ message: "Application deleted" });
};