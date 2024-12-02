-- Insert data into department table
INSERT INTO department (department_name)
VALUES
    ('Human Resources'),
    ('Engineering'),
    ('Sales'),
    ('Marketing');

-- Insert data into role table
INSERT INTO role (role_title, salary, department_id)
VALUES
    ('HR Manager', 70000, 1),
    ('Software Engineer', 90000, 2),
    ('Sales Executive', 60000, 3),
    ('Marketing Specialist', 65000, 4),
    ('Engineering Lead', 110000, 2),
    ('Sales Manager', 85000, 3);

-- Insert data into employee table
-- First, insert employees without managers
INSERT INTO employee (first_name, last_name, role_id)
VALUES
    ('John', 'Doe', 1),  -- HR Manager
    ('Jane', 'Smith', 2), -- Software Engineer
    ('Emily', 'Johnson', 3), -- Sales Executive
    ('Michael', 'Brown', 4), -- Marketing Specialist
    ('Laura', 'Davis', 5), -- Engineering Lead
    ('David', 'Wilson', 6); -- Sales Manager

-- Then, assign managers to employees
UPDATE employee
SET manager_id = (SELECT employee_id FROM employee WHERE first_name = 'John' AND last_name = 'Doe')
WHERE first_name = 'Jane' AND last_name = 'Smith';

UPDATE employee
SET manager_id = (SELECT employee_id FROM employee WHERE first_name = 'Jane' AND last_name = 'Smith')
WHERE first_name = 'Emily' AND last_name = 'Johnson';

UPDATE employee
SET manager_id = (SELECT employee_id FROM employee WHERE first_name = 'Michael' AND last_name = 'Brown')
WHERE first_name = 'Laura' AND last_name = 'Davis';

UPDATE employee
SET manager_id = (SELECT employee_id FROM employee WHERE first_name = 'David' AND last_name = 'Wilson')
WHERE first_name = 'John' AND last_name = 'Doe';
