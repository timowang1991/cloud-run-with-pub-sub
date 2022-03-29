const express = require('express');

const app = express();

app.use(express.json());

app.post('/', (req, res) => {
    if (!req.body) {
        const msg = 'no Pub/Sub message received';
        console.error(`error: ${msg}`);
        res.status(400).send(`Bad Request: ${msg}`);
        return;
    }
    if (!req.body.message) {
        const msg = 'invalid Pub/Sub message format';
        console.error(`error: ${msg}`);
        res.status(400).send(`Bad Request: ${msg}`);
        return;
    }

    console.log('original body', JSON.stringify(req.body, null, 4));

    const pubSubMessage = req.body.message;
    const name = pubSubMessage.data
        ? Buffer.from(pubSubMessage.data, 'base64').toString().trim()
        : 'World';

    console.log(`Hello ${name}!`);
    console.log(`attributes ${JSON.stringify(pubSubMessage.attributes, null, 4)}`);
    res.status(204).send();
});

app.post('/log', (req, res) => {
    console.log('your request body:', req.body);
    res.send(req.body);
});

app.listen(8080, () => {
    console.log('listening on port 8080')
});
