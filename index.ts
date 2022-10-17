const axios = require("axios");
const telegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");

dotenv.config();

const bot = new telegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

const url = "https://apple.com/shop/pickup-message-recommendations?mts.0=regular&cppart=UNLOCKED/US&location=Miami%20Beach,%20FL&product=MQ8P3LL/A";

const iPhoneModels: Record<string, string> = {
    "MQ0E3LL/A": "Pro Deep Purple 128GB",
    "MQ1D3LL/A": "Pro Deep Purple 256GB",
    "MQ273LL/A": "Pro Deep Purple 512GB",
    "MQ303LL/A": "Pro Deep Purple 1TB",
    "MQ063LL/A": "Pro Gold 128GB",
    "MQ163LL/A": "Pro Gold 256GB",
    "MQ213LL/A": "Pro Gold 512GB",
    "MQ2T3LL/A": "Pro Gold 1TB",
    "MQ003LL/A": "Pro Silver 128GB",
    "MQ0X3LL/A": "Pro Silver 256GB",
    "MQ1U3LL/A": "Pro Silver 512GB",
    "MQ2L3LL/A": "Pro Silver 1TB",
    "MPXT3LL/A": "Pro Space Black 128GB",
    "MQ0N3LL/A": "Pro Space Black 256GB",
    "MQ1K3LL/A": "Pro Space Black 512GB",
    "MQ2E3LL/A": "Pro Space Black 1TB",
    "MQ8R3LL/A": "Pro Max Deep Purple 128GB",
    "MQ8W3LL/A": "Pro Max Deep Purple 256GB",
    "MQ913LL/A": "Pro Max Deep Purple 512GB",
    "MQ953LL/A": "Pro Max Deep Purple 1TB",
    "MQ8Q3LL/A": "Pro Max Deep Gold 128GB",
    "MQ8V3LL/A": "Pro Max Deep Gold 256GB",
    "MQ903LL/A": "Pro Max Deep Gold 512GB",
    "MQ943LL/A": "Pro Max Deep Gold 1TB",
    "MQ8P3LL/A": "Pro Max Silver 128GB",
    "MQ8U3LL/A": "Pro Max Silver 256GB",
    "MQ8Y3LL/A": "Pro Max Silver 512GB",
    "MQ933LL/A": "Pro Max Silver 1TB",
    "MQ8N3LL/A": "Pro Max Space Black 128GB",
    "MQ8T3LL/A": "Pro Max Space Black 256GB",
    "MQ8X3LL/A": "Pro Max Space Black 512GB",
    "MQ923LL/A": "Pro Max Space Black 1TB",
};

setInterval(async () => {
    const response = await axios.get(url);
    const baseUrl: string = "https://www.apple.com/shop/buy-iphone/iphone-14-pro/6.1-inch-display-128gb-deep-purple-unlocked";
    const isAvailable: number = response.data.body.PickupMessage.recommendedProducts.length;

    if (isAvailable) {
        response.data.body.PickupMessage.recommendedProducts.forEach((model) => {
            bot.sendMessage(process.env.TELEGRAM_GROUP_CHAT_ID, `iPhone ${iPhoneModels[model]} | ${baseUrl}`);
        });
    } else {
        bot.sendMessage(process.env.TELEGRAM_GROUP_CHAT_ID, "No hay stock disponible");
    }
}, 60000);

// Get chatID from Telegram
// bot.on("message", (msg) => {
//   const chatId = msg.chat.id;

//   bot.sendMessage(chatId, chatId);
// });
