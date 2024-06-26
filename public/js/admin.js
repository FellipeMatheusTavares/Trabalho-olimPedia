document.addEventListener('DOMContentLoaded', function() {
    const usersTableBody = document.querySelector('#users-table tbody');

    const loadUsers = async () => {
        try {
            const response = await fetch('/api/users');
            const users = await response.json();

            usersTableBody.innerHTML = '';
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.dob}</td>
                    <td class="action-buttons">
                        <button onclick="editUser('${user.email}')">Editar</button>
                        <button onclick="deleteUser('${user.email}')">Excluir</button>
                    </td>
                `;
                usersTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
        }
    };

    window.editUser = (email) => {
        alert(`Editar usuário com email: ${email}`);
        // Adicione a lógica para editar um usuário
    };

    window.deleteUser = async (email) => {
        if (confirm(`Tem certeza que deseja excluir o usuário com email ${email}?`)) {
            try {
                const response = await fetch(`/api/users/${email}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    alert('Usuário excluído com sucesso');
                    loadUsers();
                } else {
                    alert('Erro ao excluir usuário');
                }
            } catch (error) {
                console.error('Erro ao excluir usuário:', error);
            }
        }
    };

    loadUsers();
});
