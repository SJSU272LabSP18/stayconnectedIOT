const request = require('supertest');
var app = require('../app').app;

/*Checking the status code's for the api's
Ensure they are returning status 200 ok.
*/

describe('Dashboard', () => {
  it('should return all site as response', done => {
    request(app)
      .get('/api/sites')
      .expect(200)
      .end(done);
  });
  it('should return all zones as response', done => {
    request(app)
      .get('/api/zones')
      .expect(200)
      .end(done);
  });
  it('should return all nodes as response', done => {
    request(app)
      .get('/api/nodes')
      .expect(200)
      .end(done);
  });
  it('should return sites based on id', done => {
    request(app)
      .get('/api/sites/1001')
      .expect(200)
      .end(done);
  });
  it('should return locations based on sites', done => {
    request(app)
      .get('/api/sites/1001/locations')
      .expect(200)
      .end(done);
  });
});
