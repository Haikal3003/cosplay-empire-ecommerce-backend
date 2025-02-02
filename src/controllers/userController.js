const { prisma } = require('../config/db');

async function deleteUser(req, res) {
  try {
    const userId = req.params.id;

    const user = await prisma.user.delete({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'User Not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    await prisma.user.update({
      where: { id: userId },
      data: updatedData,
    });

    return res.status(200).json({ message: 'User updated successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  deleteUser,
  updateUser,
};
