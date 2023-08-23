const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  for (let i = 0; i < users.length; i++) {
    console.log(
      "creating settings for: ",
      users[i].name,
      " - ",
      users[i].email,
    );
    prisma.settings.create({
      data: {
        key: "todoListViewType",
        type: "string",
        allowed: ["card", "list"],
        value: "list",
        userId: users[i].id,
      },
    });
  }
}

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     // close Prisma Client at the end
//     await prisma.$disconnect();
//   });
