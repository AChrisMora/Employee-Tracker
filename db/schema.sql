DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

\c company_db;

-- Create department table
CREATE TABLE department (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(30) UNIQUE NOT NULL
);

-- Create role table
CREATE TABLE role (
    role_id SERIAL PRIMARY KEY,
    role_title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT REFERENCES department(department_id)
);

-- Create employee table
CREATE TABLE employee (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT REFERENCES role(role_id),
    manager_id INT REFERENCES employee(employee_id)
);
