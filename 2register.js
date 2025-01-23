document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Zabrání přesměrování formuláře

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/register', { // Odesílá data na backend
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const message = await response.text();
        document.getElementById('registerMessage').textContent = message;
    } catch (error) {
        console.error('Chyba:', error);
        document.getElementById('registerMessage').textContent = 'Došlo k chybě při registraci.';
    }
});
