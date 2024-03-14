const client = require('../db/config');

const createUser = async (email, first_name, last_name, age, reg_number) => {
    const result = await client.query('INSERT INTO students(email, first_name, last_name, age, reg_number) VALUES($1, $2, $3, $4, $5) RETURNING *', [email, first_name, last_name, age, reg_number]);
    return result.rows[0];
};

const getUsers = async () => {
    const result = await client.query('SELECT * FROM students');
    return result.rows;
};

const getUserById = async (id) => {
    const result = await client.query('SELECT * FROM students WHERE id = $1', [id]);
    return result.rows[0];
};

const updateUser = async (id, email, first_name, last_name, age, reg_number) => {
    const result = await client.query('UPDATE students SET email = $1, first_name = $2, last_name = $3, age = $4, reg_number =$5   WHERE id = $6 RETURNING *', [email , first_name, last_name, age, reg_number, id]);
    return result.rows[0];
};

const deleteUser = async (id) => {
    const result = await client.query('DELETE FROM students WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };