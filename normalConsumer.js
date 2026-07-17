const amqp = require('amqplib');

async function recvMail() {
  const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        await channel.assertQueue('users_mail_queue', {durable: true});

        channel.consume('users_mail_queue', (message) => {
            
if(message !== null) {
    console.log("Recv message for normal user",JSON.parse(message.content));
    channel.ack(message);
}

        });
try {
    
} catch (error) {
    
}

}

recvMail();
