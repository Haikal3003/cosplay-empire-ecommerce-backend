const { prisma } = require('../config/db');

async function getAllOrders(req, res) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: { id: true, fullname: true, username: true, email: true },
        },
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getOrderById(req, res) {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: { id: true, fullname: true, username: true, email: true },
        },
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function createOrder(req, res) {
  try {
    const userId = req.userId;
    const { orderItems, shippingAddress } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await prisma.order.create({
      data: {
        userId,
        shippingAdress: shippingAddress,
        total,
        orderItems: {
          create: orderItems.map((item) => ({
            productId: item.productId,
            size: item.size,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });

    return res.status(201).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteOrder(req, res) {
  try {
    const { id } = req.params;

    await prisma.order.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
};
