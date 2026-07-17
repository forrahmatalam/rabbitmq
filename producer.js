// const amqp = require('amqplib');

// async function sendMail(){
//     try {
//         const connection = await amqp.connect('amqp://localhost');
//         const channel = await connection.createChannel();
//         const exchange = 'mail_exchange';
//         const routingKeyForNormalUser = 'send_mail_subscribed_user';
//           const routingKeyForSubUser = 'send_mail_to_user';


// const message ={
//     to:"NormalUser@gmail.com",
//     from :"alamrahmat513@gmail.com",
//     subject:"Hello tym pass mail",
//     body:"Hello bro"
// }

// await channel.assertExchange(exchange ,"direct" ,{durable:false});
// await channel.assertQueue("subscribed_users_mail_queue",{durable :true});
// await channel.assertQueue("users_mail_queue",{durable :true});

// await channel.bindQueue("subscribed_users_mail_queue",exchange,routingKeyForSubUser);
// await channel.bindQueue("users_mail_queue",exchange,routingKeyForNormalUser);


// await channel.publish(exchange,routingKeyForNormalUser,Buffer.from(JSON.stringify(message)));
// console.log("mail data was send",message);
// setTimeout(()=>{
//     connection.close();
// },500);

//     } catch (error) {
//         console.log(error);
//     }
// }

// sendMail();








                      //Learning topic exchange
const amqp = require("amqplib");



async function sendMessage(routingKey, message) {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const exchange = "notification_exchange";
    const exchangeType = "topic";

    await channel.assertExchange(exchange, exchangeType, {
      durable: true,
    });

    

    channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message)),
      {
        persistent: true,
      }
    );


    console.log("[x] Sent:", routingKey);
    console.log("Message:", message);

   

    console.log(
      `Message was sent! with routingKey as ${routingKey} and content as ${JSON.stringify(
        message
      )}`
    );

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error(error);
  }
}

// ✅ Ye calls ab kaam karengi

sendMessage("order.placed", {
  orderId: 12345,
  status: "placed",
});

sendMessage("payment.processed", {
  paymentId: 67890,
  status: "processed",
});