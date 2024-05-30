require('dotenv').config();
const { Telegraf } = require('telegraf');
const axios = require('axios');

const baseUrl = 'https://api.telegram.org/bot';
const token = process.env.TOKEN;
if (!token) {
  throw new Error('Bot token is not provided. Please set the TOKEN environment variable.');
}

// const bot = new Telegraf(token);
const bot = new Telegraf(token);

const axiosInstance = axios.create({
  baseURL: `${baseUrl}${token}`,
  timeout: 10000,
  // Uncomment and configure if you need to use a proxy
  // proxy: {
  //   host: 'your.proxy.server',
  //   port: 8080,
  //   auth: {
  //     username: 'proxy-username',
  //     password: 'proxy-password',
  //   },
  // },
});

bot.use(async (ctx, next) => {
  try {
    console.log('Connecting to Telegram API...');
    const response = await axiosInstance.get('/getMe');
    console.log('Connection successful:', response.data);
    return next();
  } catch (error) {
    if (error.code === 'ETIMEDOUT') {
      console.error('Connection timed out. Please check your internet connection or the Telegram API status.');
    } else if (error.response) {
      console.error('Error response from Telegram API:', error.response.data);
    } else {
      console.error('Error connecting to Telegram API:', error.message);
    }
    throw error;
  }
});

bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));

// Launch the bot with enhanced error handling
bot.launch().then(() => {
  console.log('Bot is up and running');
}).catch((error) => {
  console.error('Failed to launch the bot:', error.message);
});
