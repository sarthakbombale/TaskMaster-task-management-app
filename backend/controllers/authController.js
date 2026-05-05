const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 🔑 Generate Token
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET || "secret123",
        { expiresIn: "1d" }
    );
};


// ✅ REGISTER
exports.register = async (req, res) => {
    try {
        console.log("Registration attempt:", { name: req.body.name, email: req.body.email });

        const { name, email, password } = req.body;

        // validation
        if (!name || !email || !password) {
            console.log("Validation failed: missing fields");
            return res.status(400).json({ msg: "All fields are required" });
        }

        // check existing user
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log("User already exists:", email);
            return res.status(400).json({ msg: "User already exists" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Password hashed successfully");

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        console.log("User created successfully:", user._id);

        res.status(201).json({
            msg: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token: generateToken(user._id)
        });

    } catch (err) {
        console.error("Register Error:", err.message);
        res.status(500).json({ error: "Server error", details: err.message });
    }
};


// ✅ LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password required" });
        }

        // find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        res.json({
            msg: "Login successful",
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).json({ error: "Server error" });
    }
};