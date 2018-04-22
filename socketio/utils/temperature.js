var generateTemperature = (node, temperature, humidity, power) => {
  return {
    node,
    temperature,
    humidity,
    power
  };
};

module.exports = { generateTemperature };
