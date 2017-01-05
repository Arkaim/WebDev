var TelegramBot = require('node-telegram-bot-api');
var token = '273096263:AAEQE8FHbeB_rbQJn7GuExmLv5wTvxUMzJM';
var bot = new TelegramBot(token, { polling: true });

bot.getMe().then(function(me) {
    console.log('Hello! My name is %s!', me.first_name);
    console.log('My id is %s.', me.id);
    console.log('And my username is @%s.', me.username);
});


bot.onText(/\/start/, function(msg, match) {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    var messageUsr = msg.from.first_name;

    var chatId = msg.chat.id;

    bot.sendMessage(chatId, "Hello, " + messageUsr + ". You should guess the number between 1 and 100. You have only 5 lives.");

    game(chatId);


    // send back the matched "whatever" to the chat
});

function game(chatId) {
    var num = Math.floor((Math.random() * 100) + 1);
    var live = 0;
    bot.sendMessage(chatId, num);

    bot.on('text', function(msg) {
        var messageChatId = msg.chat.id;
        var messageText = msg.text;
        live++;

        if (parseInt(messageText) == num && live <= 5) {
            bot.sendMessage(messageChatId, 'win ' + parseInt(messageText));
        } else if (parseInt(messageText) != num && live <= 5) {
            bot.sendMessage(messageChatId, 'lose' + live);

        } else {
            bot.sendMessage(messageChatId, "the game ended");

        }

        console.log(msg);
    });


}



// Listen for any kind of message. There are different kinds of
// messages.
