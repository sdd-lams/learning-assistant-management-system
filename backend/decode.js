const admin = require("./admin");

class Decode {
  async decodeToken(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      if (decodeValue) {
        req.user = decodeValue;
        return next();
      }
      return res.status(401).json({ message: "Unauthorized" });
    } catch (err) {
      return res.status(500).json({ message: "Internal Error: " + err.message });
    }
  }
}

module.exports = new Decode();
