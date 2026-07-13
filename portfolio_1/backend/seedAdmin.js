require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');
const connectDB = require('./src/config/db');

const seedAdmin = async () => {
  try {
    await connectDB();

    const email = 'nuruzzaman@example.com';
    const password = 'adminpassword123'; // The user can change this later or through DB directly

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Admin user already exists!');
      process.exit();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      email,
      password: hashedPassword
    });

    console.log('Admin user created successfully');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
