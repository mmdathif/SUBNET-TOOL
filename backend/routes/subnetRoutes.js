const express = require('express');
const router = express.Router();

// Controllers
const { calculateSubnet } = require('../controller/calculate');
const { splitSubnets } = require('../controller/splitSubnets');
const { getHistory } = require('../controller/history');

const { client } = require('../config/redis');

router.post('/calculate', async (req, res) => {
  const { ip, cidr } = req.body;

  if (!ip || cidr === undefined) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    const result = calculateSubnet(ip, cidr);

    // 🔥 Save to Redis
    const data = {
      type: "calculate",
      ip,
      cidr,
      result,
      time: new Date().toISOString(),
    };

    await client.lPush('history', JSON.stringify(data));

    res.json(result);

  } catch (err) {
    console.error("CALCULATE ERROR:", err); // 👈 IMPORTANT
    res.status(500).json({ error: err.message });
  }
});


// router.post('/subnets', async (req, res) => {
//   const { ip, oldCidr, newCidr } = req.body;

//   if (!ip || oldCidr === undefined || newCidr === undefined) {
//     return res.status(400).json({ error: 'Invalid input' });
//   }

//   if (newCidr <= oldCidr) {
//     return res.status(400).json({ error: 'New CIDR must be greater' });
//   }

//   try {
//     const result = splitSubnets(ip, oldCidr, newCidr);

//     // Save to Redis
//     const data = {
//       ip,
//       oldCidr,
//       newCidr,
//       subnets: result,
//       time: new Date().toISOString(),
//     };

//     await client.lPush('history', JSON.stringify(data));

//     res.json(result);
//   } catch (err) {
//     res.status(500).json({ error: 'Subnet calculation failed' });
//   }
// });

router.post('/subnets', async (req, res) => {
  console.log("Incoming request:", req.body);

  const { ip, oldCidr, newCidr } = req.body;

  try {
    const result = splitSubnets(ip, oldCidr, newCidr);
    // console.log("Split result:", result);

    const data = {
      ip,
      oldCidr,
      newCidr,
      subnets: result,
      time: new Date().toISOString(),
    };

    // console.log("Saving to Redis...");

    await client.lPush('history', JSON.stringify(data));

    // console.log("Saved successfully");

    res.json(result);

  } catch (err) {
    console.error("ERROR:", err); 
    res.status(500).json({ error: err.message });
  }
});
// 🔹 Get history (Day 3)
router.get('/history', getHistory);

module.exports = router;