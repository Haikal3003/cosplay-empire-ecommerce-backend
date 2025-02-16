const { prisma } = require('../config/db');

async function getStats(req, res) {
  try {
    // total sales
    const totalSales = await prisma.order.aggregate({
      where: {
        isPaid: true,
      },
      _sum: {
        total: true,
      },
    });

    // total customers
    const totalCustomers = await prisma.user.count({
      where: {
        orders: {
          some: {
            isPaid: true,
          },
        },
      },
    });

    // total users
    const totalUsers = await prisma.user.count({
      where: {
        role: 'USER',
      },
    });

    // total products
    const totalProducts = await prisma.product.count();

    // total orders
    const totalOrders = await prisma.order.count();

    return res.json({
      totalSales: totalSales._sum.total || 0,
      totalUsers,
      totalCustomers,
      totalProducts,
      totalOrders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
}

module.exports = { getStats };
