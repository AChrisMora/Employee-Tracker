import { pool } from "./connection.js";


export const queries = {
    // Execute query function
    async executeQuery(query, params) {
        try {
            const res = await pool.query(query, params);
            return res.rows;  // Returns an array of results
        } catch (err) {
            console.error('Error executing query', err.stack);
            throw err; // Rethrow the error to handle it further up if needed
        }
    },

    // Function to view all departments
    async viewAllDepartments() {
        const query = 'SELECT * FROM department;';
        return await this.executeQuery(query, []);
    },

    // Function to view all roles
    async viewAllRoles() {
        const query = 'SELECT * FROM role;';
        return await this.executeQuery(query, []);
    },

    // Function to view all employees
    async viewAllEmployees() {
        const query = 'SELECT * FROM employee;';
        return await this.executeQuery(query, []);
    },

    // Function to add a department
    async addDepartment(departmentName) {
        const query = 'INSERT INTO department (department_name) VALUES ($1) RETURNING *;';
        return await this.executeQuery(query, [departmentName]);
    },

    // Function to add a role
    async addRole(roleTitle, salary, departmentId) {
        const query = 'INSERT INTO role (role_title, salary, department_id) VALUES ($1, $2, $3) RETURNING *;';
        return await this.executeQuery(query, [roleTitle, salary, departmentId]);
    },

    // Function to add an employee
    async addEmployee(firstName, lastName, roleId, managerId = null) {
        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *;';
        return await this.executeQuery(query, [firstName, lastName, roleId, managerId]);
    },

    // Function to update an employee's role
    async updateEmployeeRole(employeeId, newRoleId) {
        const query = 'UPDATE employee SET role_id = $1 WHERE employee_id = $2 RETURNING *;';
        return await this.executeQuery(query, [newRoleId, employeeId]);
    }
};
