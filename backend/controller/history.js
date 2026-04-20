const {client} = require('../config/redis');

const getHistory = async (req, res) => {
  try {
    const data = await client.lRange('history', 0, 9);
    const parsed = data.map(item => JSON.parse(item));
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};

module.exports = { getHistory };