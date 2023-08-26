const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const defaultSettings = [
  {
    name: "listViewStyle",
    value: "list",
    allowed: ["list", "card"],
  },
];

async function main() {
  await prisma.user.updateMany({
    data: {
      settings: JSON.stringify(defaultSettings),
    },
  });
  console.log("SEEDING done");
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
