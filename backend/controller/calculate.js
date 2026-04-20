function isValidIP(ip) {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;

  return parts.every((part) => {
    const num = Number(part);
    return part !== "" && num >= 0 && num <= 255;
  });
}

function ipToInt(ip) {
  return ip.split(".").reduce((acc, octet) => {
    return (acc << 8) + parseInt(octet, 10);
  }, 0) >>> 0;
}

function intToIp(int) {
  return [
    (int >>> 24) & 255,
    (int >>> 16) & 255,
    (int >>> 8) & 255,
    int & 255,
  ].join(".");
}

function calculateSubnet(ip, cidr) {
  // ✅ Validate IP
  if (!isValidIP(ip)) {
    throw new Error("Invalid IP address");
  }

  // ✅ Validate CIDR
  if (cidr < 0 || cidr > 32) {
    throw new Error("CIDR must be between 0 and 32");
  }

  const ipInt = ipToInt(ip);

  const mask = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;

  const network = ipInt & mask;
  const broadcast = network | (~mask >>> 0);

  let totalHosts;

  if (cidr === 32) {
    totalHosts = 1;
  } else if (cidr === 31) {
    totalHosts = 2; // ✅ FIXED
  } else {
    totalHosts = (2 ** (32 - cidr)) - 2;
  }

  return {
    network: intToIp(network),
    broadcast: intToIp(broadcast),
    hosts: totalHosts,
  };
}

module.exports = { calculateSubnet };