// models/userModel.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserModel {
    async getUserById(userId) {
        return await prisma.profile.findUnique({
            where: { id: userId },
        });
    }

    async updateUser(userId, userData) {
        return await prisma.profile.update({
            where: { id: userId },
            data: userData,
        });
    }

    async deleteUser(userId) {
        return await prisma.profile.delete({
            where: { id: userId },
        });
    }
}

module.exports = new UserModel();
