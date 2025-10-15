// Mock do User repository para testes
const User = {
    createUser: jest.fn(),
    getUserByEmail: jest.fn(),
    deleteUser: jest.fn(),
    updateUser: jest.fn()
};

module.exports = { User };
