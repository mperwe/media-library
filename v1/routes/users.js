
// define async function to send queries to DB
async function getUsers() {
    try {
      const users = await prisma.profile.findMany();
    } catch (error) {
      console.error(error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  getUsers();
  