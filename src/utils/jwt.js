const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { prisma } = require('../config/db');
const JWT_SECRET = process.env.JWT_SECRET;

async function generateToken(userId) {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '3d' });

  await prisma.token.create({
    data: {
      userId,
      token,
    },
  });

  return token;
}
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    return null;
  }
}

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
};
