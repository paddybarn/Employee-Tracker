INSERT INTO department (id, department_name)
VALUES (1, "sample");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "sample title", 20000, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "joe", "schmo", 1, 1);