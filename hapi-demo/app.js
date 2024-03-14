const Hapi = require('@hapi/hapi');
const client = require('./db/config')
const userRoutes = require('./routers/userRouter');

const init = async () => {

    await client.connect();

    await client.query(`
        CREATE TABLE IF NOT EXISTS students (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            age smallint NOT NULL,
            reg_number VARCHAR(255) NOT NULL
        )
    `);

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route(userRoutes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();