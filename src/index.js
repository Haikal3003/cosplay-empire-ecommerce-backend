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

app.use('/auth', authRoutes);

app.use(isAuthenticated);

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);
app.use('/uploads', uploadRoutes);
app.use('/orders', orderRoutes);

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

  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

initializeApp();

module.exports = app;
