// models/authModel.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AuthModel {
    async getUsers() {
        return await prisma.profile.findMany();
    }

    async getUserByEmail(email) {
        return await prisma.profile.findUnique({
            where: { email },
        });
    }

    async createUser(userData) {
        return await prisma.profile.create({
            data: userData,
        });
    }
}

module.exports = new AuthModel();
