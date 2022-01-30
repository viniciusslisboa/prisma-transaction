const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function create(name, email) {
  await prisma.account.create({
    data: {
      name,
      email,
    },
  });

  console.log("created.");
}

// create("leonor Maria Cruz Soares Lisboa", "l.m.s.lisboa@gmail.com");

async function transfer(from, to, amount) {
  return await prisma.$transaction(async (prisma) => {
    // 1. Decrement amount from the sender.
    const sender = await prisma.account.update({
      data: {
        balance: {
          decrement: amount,
        },
      },
      where: {
        email: from,
      },
    });
    // 2. Verify that the sender's balance didn't go below zero.
    if (sender.balance < 0) {
      throw new Error(`${from} doesn't have enough to send ${amount}`);
    }
    // 3. Increment the recipient's balance by amount
    const recipient = await prisma.account.update({
      data: {
        balance: {
          increment: amount,
        },
      },
      where: {
        email: to,
      },
    });
    return recipient;
  });
}

async function main() {
  // This transfer is successful
  await transfer("l.m.s.lisboa@gmail.com", "v.soares.lisboa@gmail.com", 950);
  // await transfer("v.soares.lisboa@gmail.com", "l.m.s.lisboa@gmail.com", 800);
}

main().catch(console.error);
