const express = require('express');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const bodyParser = require('body-parser');
const cors = require('cors');
const { setupAdmin } = require('./setup/setupAdmin');
const { prisma } = require('./config/db');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/uploads', express.static('uploads'));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);
app.use('/uploads', uploadRoutes);

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
