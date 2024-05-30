require('dotenv').config();
const { Telegraf } = require('telegraf');
const axios = require('axios');

const token = process.env.TOKEN;
if (!token) {
  throw new Error('Bot token is not provided. Please set the TOKEN environment variable.');
}

const axiosInstance = axios.create({
    baseURL: `https://api.telegram.org/bot${token}`,
    timeout: 10000,
    // Uncomment and configure if you need to use a proxy
    proxy: {
      host: 'telewebion.com',
      port: 2050,
    //   auth: {
    //     username: 'proxy-username',
    //     password: 'proxy-password',
    //   },
    },
});
// vless://edf43954-b215-4b0c-b077-678029c07242@i1.tikaltk.com:2050?security=none&encryption=none&host=telewebion.com&headerType=http&type=tcp#i1-uqxku3me

const testConnection = async () => {
    try {
      console.log('Testing connection to Telegram API...');
      const response = await axiosInstance.get('/getMe');
      console.log('Connection successful:', response.data);
    } catch (error) {
      if (error.code === 'ETIMEDOUT') {
        console.error('Connection timed out. Please check your internet connection or the Telegram API status.');
      } else if (error.response) {
        console.error('Error response from Telegram API:', error.response.data);
      } else {
        console.error('Error connecting to Telegram API:', error.message);
      }
    }
  };
  
  testConnection();
  