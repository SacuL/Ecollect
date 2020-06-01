import express from 'express';

const app = express();

app.get('/users', (request, response) => {
    console.log("Hello Users Log");

    response.json([
        'User 1',
        'User 2'
    ]);
});

app.listen(3333);