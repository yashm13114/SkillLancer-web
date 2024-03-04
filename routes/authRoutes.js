const express = require('express');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/keys');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Create a new user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Save the user in your MongoDB database
    const newUser = new User({
      firebaseUid: userRecord.uid,
      email,
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Sign in the user with Firebase Authentication
    const userRecord = await admin.auth().getUserByEmail(email);

    // Generate and send JWT token
    const token = jwt.sign({ user: { id: userRecord.uid } }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
});
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Sign in the user with Firebase Authentication
      const userRecord = await admin.auth().getUserByEmail(email);
  
      // You can fetch additional user details from your MongoDB or any other database
      const user = await User.findOne({ firebaseUid: userRecord.uid });
  
      // Generate and send JWT token along with user details
      const token = jwt.sign({ user: { id: userRecord.uid, email: user.email } }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token, user });
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

module.exports = router;
