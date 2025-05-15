const express = require("express");
const router = express.Router();
const Form = require("../models/Form"); // Model

router.post("/form", async (req, res) => {
    console.log("here")
  try {
    const { name, email, message } = req.body;
    console.log(name , email , message)

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newForm = new Form({ name, email, message });
    await newForm.save();

    res.status(201).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
