 import Application from "../models/applications.js";

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
      message: "Server error while submitting application"
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
    res.status(500).json({ message: "Server error while fetching applications" });
  }
};

export const approveApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const approvalNumber =
      "VAL-APP-" + Math.floor(100000 + Math.random() * 900000);

    const updated = await Application.findByIdAndUpdate(
      id,
      { status: "Approved", approvalNumber },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Application not found" });

    res.json({
      message: "Application Approved",
      application: updated,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const checkApplicationStatus = async (req, res) => {
  try {
    const { approval, mobile } = req.body;

    const app = await Application.findOne({ 
       approvalNumber: approval,
       mobile: mobile,
    });

    if (!app)
      return res.status(404).json({ message: "No Application Found" });

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