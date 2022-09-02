const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const createUser = async (req, res) => {
  const createdUser = await prisma.user.create({
    data: {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      profile: {
        create: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          age: req.body.age,
          pictureUrl: req.body.pictureUrl,
        },
      },
    },
    include: {
      profile: true,
    },
  });

  res.status(201).json({ user: createdUser });
};

module.exports = { createUser };
