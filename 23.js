document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('regForm');
    const usersTable = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
    const showPwdBtn = document.querySelector('.show-pwd');
    const passwordInput = document.getElementById('password');
    
    // Toggle password visibility
    showPwdBtn.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            showPwdBtn.textContent = 'Hide';
        } else {
            passwordInput.type = 'password';
            showPwdBtn.textContent = 'Show';
        }
    });
    
    // Load saved users
    loadUsers();
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const user = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            dob: document.getElementById('dob').value,
            password: document.getElementById('password').value
        };
        
        addUserToTable(user);
        saveUsers();
        form.reset();
    });
    
    function addUserToTable(user) {
        const row = usersTable.insertRow();
        
        const nameCell = row.insertCell();
        nameCell.textContent = `${user.firstName} ${user.lastName}`;
        
        const emailCell = row.insertCell();
        emailCell.textContent = user.email;
        
        const phoneCell = row.insertCell();
        phoneCell.textContent = user.phone;
        
        const dobCell = row.insertCell();
        dobCell.textContent = user.dob;
    }
    
    function saveUsers() {
        const users = [];
        const rows = usersTable.rows;
        
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].cells;
            users.push({
                firstName: cells[0].textContent.split(' ')[0],
                lastName: cells[0].textContent.split(' ')[1],
                email: cells[1].textContent,
                phone: cells[2].textContent,
                dob: cells[3].textContent
            });
        }
        
        localStorage.setItem('registeredUsers', JSON.stringify(users));
    }
    
    function loadUsers() {
        const savedUsers = localStorage.getItem('registeredUsers');
        if (savedUsers) {
            const users = JSON.parse(savedUsers);
            users.forEach(user => addUserToTable(user));
        }
    }
});