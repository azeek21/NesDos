const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  let users = [];
  let todos = [];
  let userId;
  for (let i = 0; i < 10; i++) {
    let userData = {
      email: `user${i}@example.com`,
      name: `User${i}`,
    };

    let user = await prisma.user.upsert({
      where: {
        email: userData.email,
      },
      update: {},
      create: userData,
    });

    userId = user.id;

    let todoData = {
      title: `Todo number ${i}`,
      content: `Content for todo number ${i}`,
      done: i % 2 == 0,
      ownerId: userId,
    };
    let todo = await prisma.todo.create({
      data: todoData,
    });

    users.push(user);
    todos.push(todo);
  }

  console.table(users);
  console.table(todos);
}

main()
  .catch((e) => {
    console.error(e);

    process.exit(1);
  })

  .finally(async () => {
    // close Prisma Client at the end

    await prisma.$disconnect();
  });
