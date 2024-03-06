const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require('../model/UserSchema')
const ProjectSchema = require('../model/ProjectSchema')
const Message = require('../model/messageSchema')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "tH1sIsAStr0ngJWtS3cr3tK3y#Y0urApp()yash";
mongoose
// .connect("mongodb+srv://yash:jOhfBi3986fmdSAM@cluster0.uqlowxi.mongodb.net/ExpenseTracker")
    .connect("mongodb+srv://yashm13114:sh5VlCTZNnkShVVP@cluster0.lgqyj4p.mongodb.net/NikeshWebsite")
    .then(() => {
        console.log("Connected to mongo");
    })
    .catch((err) => {
        console.log("error" + err);
    });

// User Registeration
router.post("/register", async(req, res) => {
    const { fname, lname, email, password, cpassword } = req.body;
    if (!fname || !lname || !email || !password || !cpassword) {
        return res.json({ error: "plz fill it" });
    }
    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.json({ status: "User already exists" });
        }
        const user1 = new User({ fname, lname, email, password, cpassword });

        await user1.save();

        res.status(201).json({ message: "registered successfully" });
    } catch (err) {
        console.log(err);
    }
});

// user login
router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Received Login Request:', { email, password });

        if (!email || !password) {
            console.log('Invalid Request: Missing Email or Password');
            return res.status(400).json({ error: 'Please enter all the details' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            console.log('Invalid Credentials: User not found');
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        console.log('User ID:', user._id);
        console.log('User Email:', user.email);

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log('Invalid Credentials: Password does not match');
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
            expiresIn: '30d',
        });

        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
        });

        console.log('Token:', token);
        console.log('Cookie set successfully');

        res.json({ message: 'Logged in successfully', token, user: { username: user.username, name: user.name } });

    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

// GET route for retrieving user information
router.get('/user', async(req, res) => {
    try {
        // Extract token from the request cookie
        const token = req.cookies.jwt;

        // Verify token
        const decodedToken = jwt.verify(token, JWT_SECRET);

        // Extract user ID from decoded token
        const userId = decodedToken._id;

        // Retrieve user data from the database using the user ID
        const user = await User.findById(userId);

        // If user not found, return error
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return user information
        res.json({ user: { username: user.username, name: user.name, email: user.email } });

    } catch (err) {
        console.error('Error retrieving user information:', err);
        res.status(500).send('Internal Server Error');
    }
});

// posting a project
router.post("/projectposting", async(req, res) => {
    const { title, discription, phonenumber, skills, budget } = req.body;
    if (!title || !discription || !phonenumber || !skills || !budget) {
        return res.json({ error: "plz fill it" });
    }
    try {

        const user1 = new ProjectSchema({ title, discription, phonenumber, skills, budget });

        await user1.save();

        res.status(201).json({ message: "posted successfully" });
    } catch (err) {
        console.log(err);
    }
});
// get project
router.get("/projects", async(req, res) => {
    try {
        // Fetch all projects from the database
        const projects = await ProjectSchema.find();

        // If no projects found, return an error response
        if (!projects || projects.length === 0) {
            return res.status(404).json({ error: "No projects found" });
        }

        // If projects found, return them as a response
        res.status(200).json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// Update a project
router.put("/projects/:projectId", async(req, res) => {
    const { title, description, skills, budget } = req.body;
    try {
        const updatedProject = await ProjectSchema.findByIdAndUpdate(req.params.projectId, { title, description, skills, budget }, { new: true });
        if (!updatedProject) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json(updatedProject);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete a project
router.delete("/projects/:projectId", async(req, res) => {
    try {
        const deletedProject = await ProjectSchema.findByIdAndDelete(req.params.projectId);
        if (!deletedProject) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// logout
router.get("/logout", (req, res) => {
    res.clearCookie("jwt", { path: "/" });
    res.status(200).send("hello");
    // return res.send(req.rootuser)
});

// GET messages between users
router.get('/messages', async(req, res) => {
    const { senderId, receiverId } = req.query;
    try {
        if (!senderId || !receiverId || senderId === 'undefined' || receiverId === 'undefined') {
            return res.status(400).json({ message: 'senderId and receiverId are required' });
        }
        const messages = await Message.find({ senderId, receiverId }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST a new message
router.post('/messages', async(req, res) => {
    const { senderId, receiverId, message } = req.body;
    try {
        if (!senderId || !receiverId || !message || senderId === 'undefined' || receiverId === 'undefined') {
            return res.status(400).json({ message: 'senderId, receiverId, and message are required' });
        }
        const newMessage = new Message({ senderId, receiverId, message });
        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;