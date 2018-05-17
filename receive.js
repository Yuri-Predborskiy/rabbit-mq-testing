#!/usr/bin/env node

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, connection) {
    connection.createChannel(function(err, channel) {
        const queue = 'hello';

        channel.assertQueue(queue, {durable: false});
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function(message) {
            console.log(` [x] Received ${message.content.toString()}`);
        }, {noAck: true});
    });
});
