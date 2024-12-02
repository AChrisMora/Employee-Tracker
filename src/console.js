import inquirer from 'inquirer';
import { queries } from './queries.js';

// Function to show the main menu and ask for the user's choice
async function mainMenu() {
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update Employee Role',
            'Exit'
        ]
    });

    // Based on user selection, call the appropriate function
    switch (action) {
        case 'View All Departments':
            viewAllDepartments();
            break;
        case 'View All Roles':
            viewAllRoles();
            break;
        case 'View All Employees':
            viewAllEmployees();
            break;
        case 'Add a Department':
            addDepartment();
            break;
        case 'Add a Role':
            addRole();
            break;
        case 'Add an Employee':
            addEmployee();
            break;
        case 'Update Employee Role':
            updateEmployeeRole();
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit();
    }
}

// View all departments
async function viewAllDepartments() {
    try {
        const departments = await queries.viewAllDepartments();
        console.log('Departments:', departments);
    } catch (err) {
        console.error('Error fetching departments:', err);
    }
    mainMenu();  // Return to the main menu after displaying the result
}

// View all roles
async function viewAllRoles() {
    try {
        const roles = await queries.viewAllRoles();
        console.log('Roles:', roles);
    } catch (err) {
        console.error('Error fetching roles:', err);
    }
    mainMenu();  // Return to the main menu
}

// View all employees
async function viewAllEmployees() {
    try {
        const employees = await queries.viewAllEmployees();
        console.log('Employees:', employees);
    } catch (err) {
        console.error('Error fetching employees:', err);
    }
    mainMenu();  // Return to the main menu
}

// Add a department
async function addDepartment() {
    const { departmentName } = await inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'Enter the department name:'
    });

    try {
        const result = await queries.addDepartment(departmentName);
        console.log('Department added:', result);
    } catch (err) {
        console.error('Error adding department:', err);
    }
    mainMenu();  // Return to the main menu
}

// Add a role
async function addRole() {
    const { roleTitle, salary, departmentId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'roleTitle',
            message: 'Enter the role title:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary:'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'Enter the department ID for this role:'
        }
    ]);

    try {
        const result = await queries.addRole(roleTitle, salary, departmentId);
        console.log('Role added:', result);
    } catch (err) {
        console.error('Error adding role:', err);
    }
    mainMenu();  // Return to the main menu
}

// Add an employee
async function addEmployee() {
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the first name:'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the last name:'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Enter the role ID for the employee:'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'Enter the manager ID (leave blank if none):',
            default: null
        }
    ]);

    try {
        const result = await queries.addEmployee(firstName, lastName, roleId, managerId);
        console.log('Employee added:', result);
    } catch (err) {
        console.error('Error adding employee:', err);
    }
    mainMenu();  // Return to the main menu
}

// Update employee role
async function updateEmployeeRole() {
    const { employeeId, newRoleId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'Enter the employee ID to update:'
        },
        {
            type: 'input',
            name: 'newRoleId',
            message: 'Enter the new role ID:'
        }
    ]);

    try {
        const result = await queries.updateEmployeeRole(employeeId, newRoleId);
        console.log('Employee role updated:', result);
    } catch (err) {
        console.error('Error updating employee role:', err);
    }
    mainMenu();  // Return to the main menu
}

// Start the app by showing the main menu
mainMenu();
