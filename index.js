const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('./src/config/passport');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

const { setupAdmin } = require('./src/setup/setupAdmin');
const { prisma } = require('./src/config/db');
const { isAuthenticated } = require('./src/middlewares/jwtMiddleware');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/uploads', express.static('uploads'));

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', authRoutes);

app.use(isAuthenticated);

app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', uploadRoutes);
app.use('/api', orderRoutes);

app.get('/', async (req, res) => {
  res.json({ message: 'Hello world!' });
});

const initializeApp = async () => {
  try {
    await setupAdmin();
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

initializeApp();

module.exports = app;
