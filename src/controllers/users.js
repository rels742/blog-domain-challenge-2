const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const createUser = async (req, res) => {
  const { username, email, password, firstName, lastName, age, pictureUrl } =
    req.body;

  if (
    !username ||
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !age ||
    !pictureUrl
  ) {
    return res.status(400).json({
      error: "Missing fields missing in the request body",
    });
  }

  const createdUser = await prisma.user.create({
    data: {
      username,
      email,
      password,
      profile: {
        create: {
          firstName,
          lastName,
          age,
          pictureUrl,
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
