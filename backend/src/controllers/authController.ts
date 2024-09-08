import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.status(201).json({ message: 'User created successfully', userId: user._id, token });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.json({ userId: user._id, token });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  // For JWT, we don't need to do anything on the server side
  // The client should remove the token from storage
  res.json({ message: 'Logged out successfully' });
};
