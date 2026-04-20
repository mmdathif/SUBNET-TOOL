function isValidIP(ip) {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;

  return parts.every((part) => {
    const num = Number(part);
    return part !== "" && num >= 0 && num <= 255;
  });
}

function ipToInt(ip) {
  return ip
    .split(".")
    .reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

function intToIp(int) {
  return [
    (int >>> 24) & 255,
    (int >>> 16) & 255,
    (int >>> 8) & 255,
    int & 255,
  ].join(".");
}

function splitSubnets(ip, oldCidr, newCidr) {
  // ✅ Validation
  if (!isValidIP(ip)) {
    throw new Error("Invalid IP address");
  }

  if (
    oldCidr < 0 || oldCidr > 32 ||
    newCidr < 0 || newCidr > 32
  ) {
    throw new Error("CIDR must be between 0 and 32");
  }

  if (newCidr <= oldCidr) {
    throw new Error("New CIDR must be greater than Old CIDR");
  }

  const totalSubnets = 2 ** (newCidr - oldCidr);

  // 🚨 Prevent server crash
  if (totalSubnets > 10000) {
    throw new Error("Too many subnets to generate");
  }

  const baseIp = ipToInt(ip);
  const oldMask = (~0 << (32 - oldCidr)) >>> 0;
  const networkBase = baseIp & oldMask;

  const subnetSize = 2 ** (32 - newCidr);

  const subnets = [];

  for (let i = 0; i < totalSubnets; i++) {
    const subnetNetwork = networkBase + i * subnetSize;
    const subnetBroadcast = subnetNetwork + subnetSize - 1;

    let firstHost, lastHost;

    if (newCidr === 32) {
      firstHost = lastHost = subnetNetwork;
    } else if (newCidr === 31) {
      firstHost = subnetNetwork;
      lastHost = subnetBroadcast;
    } else {
      firstHost = subnetNetwork + 1;
      lastHost = subnetBroadcast - 1;
    }

    subnets.push({
      network: intToIp(subnetNetwork),
      broadcast: intToIp(subnetBroadcast),
      firstHost: intToIp(firstHost),
      lastHost: intToIp(lastHost),
    });
  }

  return subnets;
}

module.exports = { splitSubnets };