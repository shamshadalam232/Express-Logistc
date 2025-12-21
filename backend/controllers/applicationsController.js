import Application from "../models/applications.js";
import { sendMail } from "../utils/sendMail.js";
import path from "path";
import fs from "fs";

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

    console.log("🔍 Approve request received for ID:", id);
    

    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (!req.file) {
      console.log("❌ No file uploaded");
      return res.status(400).json({ message: "Approval PDF is required" });
    }

    console.log("✅ File received:");
    console.log("   - Filename:", req.file.filename);
    console.log("   - Path:", req.file.path);
    console.log("   - Size:", req.file.size);

   

    const approvalNumber =
      "VAL-APP-" + Math.floor(100000 + Math.random() * 900000);

    application.status = "Approved";
    application.approvalNumber = approvalNumber;
    
    // Construct PDF URL
    application.approvalPdf = req.file.path;

    console.log("🔗 PDF URL:", application.approvalPdf);

    await application.save();

    console.log("💾 Application saved to database");

    // Send email
    if (application.email) {
      try {
        await sendMail({
          to: application.email,
          subject: "Your Application has been Approved",
          html: `
            <h2>Hello ${application.fullName},</h2>
            <p>Your application has been <b>approved</b>.</p>
            <p><b>Approval Number:</b> ${approvalNumber}</p>
            
            <p>You can check your status anytime using this approval number.</p>

            <br/>
            <p>Regards,<br/>Express Logistics Team</p>
          `,
        });
        console.log("📧 Email sent successfully");
      } catch (emailError) {
        console.error("📧 Email error:", emailError);
        // Don't fail the request if email fails
      }
    }

    res.json({
      success: true,
      message: "Application approved & PDF uploaded",
      data: application,
    });

    console.log("✅ Response sent successfully");

  } catch (err) {
    console.error("❌ APPROVE ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const checkApplicationStatus = async (req, res) => {
  try {
    const { approval, mobile } = req.body;

    const app = await Application.findOne({
      approvalNumber: approval,
      mobile: mobile,
    });

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