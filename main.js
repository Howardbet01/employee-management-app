const form = document.getElementById('employeeForm');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const employee = {
            fname:      document.getElementById('fname').value,
            lname:      document.getElementById('lname').value,
            email:      document.getElementById('email').value,
            phone:      document.getElementById('phone').value,
            department: document.getElementById('department').value,
            position:   document.getElementById('position').value,
        };

        const employees = JSON.parse(localStorage.getItem('employees') || '[]');
        employees.push(employee);
        localStorage.setItem('employees', JSON.stringify(employees));

        alert('Employee added successfully!');
        form.reset();
    });
}

const tbody = document.querySelector('#employeeTable tbody');
if (tbody) {
    renderTable();
}

function renderTable() {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');

    if (employees.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">No employees found.</td></tr>';
    } else {
        tbody.innerHTML = '';
        employees.forEach(function (emp, index) {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${emp.fname} ${emp.lname}</td>
                    <td>${emp.phone}</td>
                    <td>${emp.email}</td>
                    <td>
                        <button onclick="viewEmployee(${index})">Details</button>
                        <button onclick="editEmployee(${index})">Edit</button>
                        <button onclick="deleteEmployee(${index})">Delete</button>
                    </td>
                </tr>`;
            tbody.innerHTML += row;
        });
    }
}

function viewEmployee(index) {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const emp = employees[index];
    alert(
        'Name:       ' + emp.fname + ' ' + emp.lname + '\n' +
        'Email:      ' + emp.email + '\n' +
        'Phone:      ' + emp.phone + '\n' +
        'Department: ' + emp.department + '\n' +
        'Position:   ' + emp.position
    );
}

function editEmployee(index) {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const emp = employees[index];

    const newName  = prompt('First Name:', emp.fname);
    if (newName === null) return;
    const newLname = prompt('Last Name:', emp.lname);
    if (newLname === null) return;
    const newEmail = prompt('Email:', emp.email);
    if (newEmail === null) return;
    const newPhone = prompt('Phone:', emp.phone);
    if (newPhone === null) return;
    const newDept  = prompt('Department:', emp.department);
    if (newDept === null) return;
    const newPos   = prompt('Position:', emp.position);
    if (newPos === null) return;

    employees[index] = {
        fname:      newName,
        lname:      newLname,
        email:      newEmail,
        phone:      newPhone,
        department: newDept,
        position:   newPos,
    };

    localStorage.setItem('employees', JSON.stringify(employees));
    alert('Employee updated!');
    renderTable();
}

function deleteEmployee(index) {
    const confirmed = confirm('Are you sure you want to delete?');
    if (!confirmed) return;

    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    employees.splice(index, 1);
    localStorage.setItem('employees', JSON.stringify(employees));
    renderTable();
}