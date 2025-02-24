const { prisma } = require('../config/db');

async function getAllUsers(req, res) {
  try {
    const user = await prisma.user.findMany();

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

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
    const newImage = req.file ? req.file.path : null;

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { image: true },
    });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (newImage && existingUser.image) {
      const oldImagePublicId = existingUser.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`avatars/${oldImagePublicId}`);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...updatedData,
        image: newImage || existingUser.image,
      },
    });

    return res.status(200).json({
      message: 'User updated successfully!',
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAllUsers,
  deleteUser,
  updateUser,
};
