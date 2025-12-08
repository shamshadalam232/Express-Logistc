export const adminProtect = (req, res, next) => {

if (req.method === "OPTIONS") {
    return next();
  }


  const adminKey = req.headers["admin-key"];

  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ message: "Invalid Admin Key" });
  }

  return next();
};

