// Mock do setup.js para testes
const dbConnect = jest.fn().mockResolvedValue({
    query: jest.fn(),
    release: jest.fn()
});

module.exports = { dbConnect };
