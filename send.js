#!/usr/bin/env node

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
    connection.createChannel(function(err, channel) {
        let queue = 'hello';
        let message = 'Hello World!';

        channel.assertQueue(queue, {durable: false});
        channel.sendToQueue(queue, new Buffer(message));
        console.log(` [x] Sent ${message}`);
    });
    setTimeout(function() { connection.close(); process.exit(0) }, 500);
});