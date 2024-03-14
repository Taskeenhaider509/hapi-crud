const Joi = require('joi');
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../services/userServices');

const userRoutes = [
    {
        method: 'POST',
        path: '/users',
        handler: async (request, h) => {
            const { email, first_name, last_name, age, reg_number } = request.payload;
            const user = await createUser(email, first_name, last_name, age, reg_number);
            return h.response(user).code(201);
        },
        options: {
            validate: {
                payload: Joi.object({
                    email: Joi.string().required(),
                    first_name: Joi.string().required(),
                    last_name: Joi.string().required(),
                    age: Joi.number().required(),
                    reg_number: Joi.string().required()

                })
            }
        }
    },
    {
        method: 'GET',
        path: '/users',
        handler: async (request, h) => {
            const users = await getUsers();
            return h.response(users);
        }
    },
    {
        method: 'GET',
        path: '/users/{id}',
        handler: async (request, h) => {
            const id = parseInt(request.params.id);
            const user = await getUserById(id);
            if (!user) {
                return h.response().code(404);
            }
            return h.response(user);
        }
    },
    {
        method: 'PUT',
        path: '/users/{id}',
        handler: async (request, h) => {
            const id = parseInt(request.params.id);
            const { email, first_name, last_name, age, reg_number } = request.payload;
            const user = await updateUser(id, email, first_name, last_name, age, reg_number);
            if (!user) {
                return h.response().code(404);
            }
            return h.response(user);
        },
        options: {
            validate: {
                payload: Joi.object({
                    email: Joi.string(),
                    first_name: Joi.string(),
                    last_name: Joi.string(),
                    age: Joi.string(),
                    reg_number: Joi.string()
                }),
                params: Joi.object({
                    id: Joi.number().integer().required(),
                }),
            }
        }
    },
    {
        method: 'DELETE',
        path: '/users/{id}',
        handler: async (request, h) => {
            const id = parseInt(request.params.id);
            const user = await deleteUser(id);
            if (!user) {
                return h.response().code(404);
            }
            return h.response(user);
        }
    }
];

module.exports = userRoutes;