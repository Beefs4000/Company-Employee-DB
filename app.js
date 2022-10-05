const inquirer = require('inquirer');
const { getDepartment, addDepartment } = require('./models/department');
const { getEmployee, addEmployee, updateEmployee} = require('./models/employee');
const { getRole, addRole } = require('./models/role');


// Recursive fuction
function main() {
    return inquirer.prompt([
        // Give the user a range of selections 
        {
            message: "What you you like to do?",
            type: 'list',
            name: 'operation',
            choices: [
                'View All Employees',
                'Add Employees',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add A Department',
                'Exit',
            ]
        },
        {
            message: 'What Is The Department Name?',
            type: 'input',
            name: 'department_name',
            when: (ans) => ans.operation === 'Add A Department'
        },
        {
            message: 'What Is The Employees Name?',
            type: 'input',
            name: 'employee_name',
            when: (ans) => ans.operation === 'Add Employees'
        },
        {
            message: 'Which Employee Do You Want To Update?',
            type: 'input',
            name: 'update_employee',
            when: (ans) => ans.operation === 'Update Employee Role'
        },
        {
            message: 'What Is The Role?',
            type: 'input',
            name: 'role_name',
            when: (ans) => ans.operation === 'Add Role'
        },

    ]).then(async (ans) => {

        switch (ans.operation) {

            case 'View All Employees':
                const employees = await getEmployee();
                console.table(employees);
                break;

            case 'Add Employees':
                const employee = await addEmployee(ans.employee_name);
                console.table(employee);
                break;

            case 'Update Employee Role':
                const updateEmployee = await updateEmployee(ans.update_employee);
                console.table(updateEmployee);
                break;

            case 'View All Roles':
                const roles = await getRole();
                console.table(roles);
                break;

            case 'Add Role':
                const role = await addRole(ans.role_name);
                console.table(role);
                break;

            case 'Add A Department':
                const department = await addDepartment(ans.department_name);
                console.table(department);
                break;

            case 'View All Departments':
                const departments = await getDepartment();
                console.table(departments);
                break;

            case 'Exit':
                process.exit(0);
                break;
        }

        await main();

    })
}

main();

// Create CLI to manage employees




