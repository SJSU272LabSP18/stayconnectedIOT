var expect = require('expect');

var { generateTemperature } = require('./temperature');

describe('generateTemperature', () => {
  it('Should generate correct object', () => {
    var parentNode = 'R1';
    var temperature = 12;
    var humidity = 14;
    var power = 13;
    var message = generateTemperature(parentNode, temperature, humidity, power);

    //expect(message).toInclude({ parentNode, temperature, humidity, power });
  });
});
