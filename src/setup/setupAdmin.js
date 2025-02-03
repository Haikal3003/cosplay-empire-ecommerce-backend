const { prisma } = require('../config/db');
const { hashPassword } = require('../utils/jwt');

require('dotenv').config();

async function setupAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error('Admin email or password is not set in environment variables');
    return;
  }

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log('Admin user already exist');
    return;
  }

  const hashedPassword = await hashPassword(adminPassword);

  const admin = await prisma.user.create({
    data: {
      fullname: 'Muhammad Fikry Haikal',
      username: 'Violettooo',
      email: 'mfikryhaikal1@gmail.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Admin created: ', admin);
}

module.exports = { setupAdmin };
