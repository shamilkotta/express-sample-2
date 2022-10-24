const express = require("express");
const loginHelper = require("../helpers/loginHelper");

const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.loggedIn) res.render("home");
  else res.redirect("/login");
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) res.redirect("/");
  else res.render("login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await loginHelper(email, password);
  if (result.status) {
    req.session.loggedIn = true;
    req.session.id = email;
    res.redirect("/");
  } else res.render("login", result);
});

module.exports = router;
