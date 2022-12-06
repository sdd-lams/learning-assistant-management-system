const admin = require("./admin");

class Decode {
  async decodeToken(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      if (decodeValue) {
        req.user = decodeValue;
        var db = admin.firestore();
        var userData = (await db.doc(`users/${req.user.uid}`).get()).data();
        if (userData.role.toLowerCase() != 'la') {
          return res.status(401).json({ message: "Unauthorized" });
        }
        return next();
      }
      return res.status(401).json({ message: "Unauthorized" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Internal Error: " + err.message });
    }
  }
}

module.exports = new Decode();
