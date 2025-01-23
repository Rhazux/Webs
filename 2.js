document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.text();
        document.getElementById('registerMessage').textContent = data;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('registerMessage').textContent = 'Došlo k chybě při registraci.';
    }

    const express = require('express');
    const bcrypt = require('bcrypt');
    const bodyParser = require('body-parser');
    
    const app = express();
    app.use(bodyParser.json());
    
    const users = []; // Jednoduché úložiště uživatelů
    
    // API pro registraci
    app.post('/api/register', async (req, res) => {
        const { email, password } = req.body;
    
        // Ověření, zda uživatel již existuje
        if (users.find(user => user.email === email)) {
            return res.status(400).send('Uživatel s tímto e-mailem již existuje.');
        }
    
        // Hashování hesla
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Uložení uživatele
        users.push({ email, password: hashedPassword });
        res.status(201).send('Účet byl úspěšně vytvořen!');
    });
    
    // Spuštění serveru
    app.listen(3000, () => console.log('Server běží na http://localhost:3000'));

})
