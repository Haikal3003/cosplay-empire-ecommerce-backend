const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const orderRoutes = require('./routes/orderRoutes');

const { setupAdmin } = require('./setup/setupAdmin');
const { prisma } = require('./config/db');
const { isAuthenticated } = require('./middlewares/jwtMiddleware');
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

app.use('/api/auth', authRoutes);

app.use(isAuthenticated);

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/orders', orderRoutes);

const initializeApp = async () => {
  try {
    await setupAdmin();
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = async (req, res) => {
  await initializeApp();
  app(req, res);
};
