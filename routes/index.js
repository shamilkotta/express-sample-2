const express = require("express");
const loginHelper = require("../helpers/loginHelper");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await loginHelper(email, password);
  if (result.status) res.redirect("/");
  else res.render("login", result);
});

module.exports = router;
