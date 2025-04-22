const express = require("express");
const router = express.Router();

router.use(express.json({ limit: "10MB" }));

// Add your active routes here
// Example route:
router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = router;
