import {User} from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  const {username, email, password} = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({message: "Please provide all required fields"});
  }

    try {
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({message: "User already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({username, email, password: hashedPassword});

    await newUser.save();

    const token = generateToken(newUser._id);

    return res.status(201).json({
      token: token,
      user: { id: newUser._id, username: newUser.username, email: newUser.email },
    });

} catch (error) {
    return res.status(500).json({message: "Server error", error: error.message});
  }
};

export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({message: "Please provide all required fields"});
    }

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = generateToken(user._id);
        return res.status(200).json({
            token: token,
            user: { id: user._id, username: user.username, email: user.email },
        });
    } catch (error) {
        return res.status(500).json({message: "Server error", error: error.message});
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message: "Server error", error: error.message});
    }
};
