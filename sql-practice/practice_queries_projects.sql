-- How many people work in the Sales department?
SELECT
    count(*) as employees_in_sales
    FROM employee e
    JOIN department d
    ON e.department = d.id
    WHERE d.dept_name = 'Sales'
;

-- List the names of all employees assigned to the 'Plan Christmas party' project.
SELECT
    e.emp_name,
    p.project_name
    FROM employee e
    JOIN employee_project ep 
    ON e.id = ep.emp_id
        JOIN project p
        ON ep.project_id = p.id
    WHERE p.project_name = 'Plan christmas party'
;

-- List the names of employees from the Warehouse department that are assigned to the 'Watch paint dry' project.
SELECT
    e.emp_name,
    p.project_name,
    d.dept_name
    FROM employee e
    JOIN employee_project ep 
    ON e.id = ep.emp_id
        JOIN project p
        ON ep.project_id = p.id
        JOIN department d 
        ON e.department = d.id
    WHERE p.project_name = 'Watch paint dry' 
        AND d.dept_name = 'Warehouse'
;


-- Which projects are the Sales department employees assigned to?
SELECT
    e.emp_name,
    p.project_name
    FROM employee e
    JOIN employee_project ep 
    ON e.id = ep.emp_id
        JOIN project p
        ON ep.project_id = p.id
        JOIN department d 
        ON e.department = d.id
    WHERE d.dept_name = 'Sales'
;

-- List only the managers that are assigned to the 'Watch paint dry' project.
SELECT
    e.emp_name,
    d.dept_name,
    p.project_name
    FROM employee e
    JOIN employee_project ep 
    ON e.id = ep.emp_id
        JOIN project p
        ON ep.project_id = p.id
        JOIN department d 
        ON e.department = d.id
    WHERE e.id = d.manager
        AND p.project_name = 'Watch paint dry' 
;