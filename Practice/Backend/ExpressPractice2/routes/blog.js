
const express = require("express");

const router = express.Router();

// Home page route.
router.get("/", (req, res) => {
  res.send("Blog home page");
});

// About page route.
router.get("/about", (req, res) => {
  res.send("About this Blog");
});

module.exports = router;