const { prisma } = require('../config/db');
const { hashPassword, comparePassword, generateToken } = require('../utils/jwt');

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        oauthAccounts: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    await prisma.token.deleteMany({
      where: { userId: user.id },
    });

    const token = await generateToken(user.id);

    return res.status(200).json({ user, token, message: 'User login successfully' });
  } catch (error) {
    console.error(error);
    return json.status(500).json({ error: 'Internal server error' });
  }
}

async function register(req, res) {
  try {
    const { fullname, username, email, password } = req.body;

    if (!fullname || !username || !email || !password) {
      return res.status(400).json({ message: 'Email, password, fullname, and username are required' });
    }

    const userEmailExist = await prisma.user.findUnique({
      where: { email },
    });

    if (userEmailExist) {
      return res.status(409).json({ message: 'Email is already taken' });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        fullname,
        username,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ user: newUser, message: 'User register successfully! ' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { login, register };
