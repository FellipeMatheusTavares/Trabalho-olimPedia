document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const signupForm = document.getElementById('signup-form');
    const chatForm = document.getElementById('chat-form');
    const chatBox = document.getElementById('chat-box');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            // Aqui você pode implementar a lógica de login
            // Por enquanto, redireciona para a página de chat após o login fictício
            window.location.href = 'chat.html';
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            window.location.href = 'cadastro.html';
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Aqui você pode implementar a lógica de logout
            window.location.href = '/';
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(signupForm);
            const userData = {
                name: formData.get('name'),
                dob: formData.get('dob'),
                email: formData.get('email'),
                password: formData.get('password')
            };

            try {
                const response = await fetch('/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });

                if (response.ok) {
                    // Redireciona para a página de chat após o cadastro bem-sucedido
                    window.location.href = 'chat.html';
                } else {
                    console.error('Erro ao cadastrar usuário');
                }
            } catch (error) {
                console.error('Erro ao cadastrar usuário', error);
            }
        });
    }

    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const chatInput = document.getElementById('chat-input');
            const message = chatInput.value;
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            chatBox.appendChild(messageElement);
            chatInput.value = '';
        });
    }
});
