
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
const port = 4100;


app.get('/', (req, res) => {
  res.send('Hello, Express Server connecting!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// define async function to send queries to DB
async function getUsers() {
  try {
    const users = await prisma.profile.findMany();
    console.log(users);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

getUsers();
