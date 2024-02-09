// models/userModel.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserModel {
    async getUserById(userId) {
        return await prisma.profile.findUnique({
            where: { id: userId },
        });
    }

    async updateUser(userEmail, userData) {
        return await prisma.profile.update({
            where: { email: userEmail },
            data: userData,
        });
    }

    async deleteUser(userEmail) {
        return await prisma.profile.delete({
            where: { email: userEmail },
        });
    }

    async getUsers(){
        return await prisma.profile.findMany()
    }
}

module.exports = new UserModel();
