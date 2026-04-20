const { createClient } = require('redis');

const client = createClient({
  url: REDIS_URL="rediss://default:gQAAAAAAARe8AAIncDI0ZmZmMjZkZWUzOWQ0NjI5YTI2MDZhNWY4M2E4ZGU1MXAyNzE2MTI@awaited-doe-71612.upstash.io:6379",
});

client.connect()
  .then(() => console.log("Redis connected"))
  .catch(err => console.error(err));

module.exports = {client};