const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const USERS_FILE = path.join(__dirname, '../data/users.json');
const SECRET_KEY = 'your_secret_key_here';

const readUsersFromFile = () => {
    const data = fs.readFileSync(USERS_FILE);
    return JSON.parse(data);
};

const writeUsersToFile = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Listar todos os usuários
router.get('/', (req, res) => {
    const users = readUsersFromFile();
    res.json(users);
});

// Adicionar um novo usuário
router.post('/', async (req, res) => {
    const users = readUsersFromFile();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = { ...req.body, password: hashedPassword };
    users.push(newUser);
    writeUsersToFile(users);
    res.status(201).json(newUser);
});

// Atualizar um usuário
router.put('/:email', (req, res) => {
    const users = readUsersFromFile();
    const userIndex = users.findIndex(user => user.email === req.params.email);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...req.body };
        writeUsersToFile(users);
        res.json(users[userIndex]);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
});

// Deletar um usuário
router.delete('/:email', (req, res) => {
    let users = readUsersFromFile();
    const userIndex = users.findIndex(user => user.email === req.params.email);
    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1);
        writeUsersToFile(users);
        res.json(deletedUser);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
});

module.exports = router;
