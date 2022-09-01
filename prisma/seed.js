const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const createdUser = await prisma.user.create({
    data: {
      username: "Alice",
      email: "alice@hotgmail.com",
      password: "blog123",
    },
  });

  console.log("Customer created", createdUser);

  const createdProfile = await prisma.profile.create({
    data: {
      firstName: "Alice",
      lastName: "Sim",
      age: 24,
      pictureUrl: "www.fakepicurl.com",
      userId: createdUser.id,
    },
  });

  process.exit(0);
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
