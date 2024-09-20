const User = require("../models/User");
const bcrypt = require("bcrypt");

const registerController =  async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.status(401).json({ message: "All fields are required!" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword });

    try {
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to register user", details: error.message });
    }
}

const loginController = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const dbpassword = await bcrypt.compare(password, user.password);

    if (user && dbpassword) {

        const token = jwt.sign({ user_id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "30m" });
        res.json({ token });

    } else {
        res.status(401).json({ error: "Invalid credentials" });
    }
}

module.exports = {
    registerController,
    loginController
}