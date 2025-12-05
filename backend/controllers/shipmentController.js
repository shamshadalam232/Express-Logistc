import Shipment from "../models/shipment.js";

export const addShipment = async (req, res) => {
  try {
    const shipment = await Shipment.create(req.body);
    res.json({
      message: "Shipment Added Successfully",
      shipment
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllShipments = async (req, res) => {
  const shipments = await Shipment.find();
  res.json(shipments);
};

export const updateShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!shipment)
      return res.status(404).json({ message: "Shipment Not Found" });

    res.json({
      message: "Shipment Updated",
      shipment
    });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const trackShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findOne({
      trackingId: req.params.trackingId
    });

    if (!shipment) {
      return res.status(404).json({ message: "Tracking ID Not Found" });
    }

    res.json({
      trackingId: shipment.trackingId,
      customerName: shipment.customerName,
      status: shipment.status,
      timeline: shipment.timeline,
      pickupAddress: shipment.pickupAddress,
      deliveryAddress: shipment.deliveryAddress,
      productDetails: shipment.productDetails
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const checkStatus = async (req, res) => {
  try {
    const { mobile, approval } = req.body;

    const shipment = await Shipment.findOne({
      mobile,
      trackingId: approval
    });

    if (!shipment) {
      return res.status(404).json({ message: "No Record Found" });
    }

    res.json({
      customerName: shipment.customerName,
      mobile: shipment.mobile,
      trackingId: shipment.trackingId,
      status: shipment.status,
      timeline: shipment.timeline,
      deliveryAddress: shipment.deliveryAddress,
      pickupAddress: shipment.pickupAddress
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};


export const getApplications = async (req, res) => {
  const apps = await Application.find().sort({ createdAt: -1 });
     res.json(apps);
};

// DELETE SHIPMENT (ADMIN)
export const deleteShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findByIdAndDelete(req.params.id);

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.json({ message: "Shipment deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE SHIPMENT BY TRACKING ID (USER)
export const getShipments = async (req, res) => {
  try {
    const shipment = await Shipment.findOne({ trackingId: req.params.id });

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.json(shipment);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
