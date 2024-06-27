import { prisma } from "@lib/prisma";

async function main() {
  await prisma.user.create({
    data: {
        email: "hello@world.com",
        password: "hello",

    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
