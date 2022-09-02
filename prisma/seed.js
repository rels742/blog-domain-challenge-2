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

  const createdPost = await prisma.post.create({
    data: {
      title: "Careers in Tech",
      content:
        "Always wondered what career options are avaliable in the tech industry? Read on to find out what the most in demand tech jobs are...",
      imageUrl: "https://www.faketechimage.com",
      userId: createdUser.id,
      categories: {
        create: [{ name: "Tech" }, { name: "Careers" }],
      },
    },
    include: {
      categories: true,
    },
  });
  console.log("categories created", createdPost);

  const createdCategory = await prisma.category.create({
    data: {
      name: "Activities",
      posts: {
        create: [
          {
            title: "Fun things to do in London",
            content: "Here are top ten fun things to do in London...",
            imageUrl: "https://www.londonimage.com",
            publishedAt: new Date("August 29, 2022 18:00:00"),
            userId: createdUser.id,
          },
          {
            title: "Next months events",
            content:
              "Wondering what events to hit up next month, read below you don't want to miss these...",
            imageUrl: "https://www.eventsimage.com",
            publishedAt: new Date("August 30, 2022 21:45:00"),
            userId: createdUser.id,
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  });
  console.log("posts created", createdCategory);

  const createdComment = await prisma.comment.create({
    data: {
      content: "Thanks a lot!",
      userId: createdUser.id,
      postId: createdPost.id,
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
