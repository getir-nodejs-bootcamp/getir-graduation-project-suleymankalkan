const supertest = require('supertest');
const Mongoose = require('mongoose');
const app = require('../../src/testServer');

// Set the timeout to 120 seconds incase of db connection takes more time than expected
jest.setTimeout(120000);

// Close DB connection after tests
afterAll(() => Mongoose.disconnect());

describe('POST /records', () => {
  test('Should return record', async () => {
    const res = await supertest(app)
      .post('/records')
      .send({
        startDate: '2016-01-23',
        endDate: '2016-01-26',
        minCount: 1,
        maxCount: 50,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.code).toBe(0);
    expect(res.body.msg).toBe('Success');
    expect(res.body.records).toBeDefined();
  });

  test('Should return no records found', async () => {
    const res = await supertest(app)
      .post('/records')
      .send({
        startDate: '2016-01-23',
        endDate: '2016-01-26',
        minCount: 1,
        maxCount: 2,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.code).toBe(1);
    expect(res.body.msg).toBe('No records found.');
  });

  test('Should return error for mistyped maxCount column', async () => {
    const res = await supertest(app)
      .post('/records')
      .send({
        startDate: '2016-01-23',
        endDate: '2016-01-26',
        minCount: 1,
        maxCount: 'getir',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.code).toBe(1);
    expect(res.body.msg).toBe('\"maxCount\" must be a number');
  });

  test('Should return error if minCount is higher than maxCount', async () => {
    const res = await supertest(app)
      .post('/records')
      .send({
        startDate: '2016-01-23',
        endDate: '2016-01-26',
        minCount: 1000,
        maxCount: 500,
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.code).toBe(1);
    expect(res.body.msg).toBe('\"maxCount\" must be greater than ref:minCount');
  });

  test('Should return error if startDate is greater than endDate', async () => {
    const res = await supertest(app)
      .post('/records')
      .send({
        startDate: '2017-01-23',
        endDate: '2016-01-26',
        minCount: 1000,
        maxCount: 5000,
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.code).toBe(1);
    expect(res.body.msg).toBe('\"endDate\" must be greater than \"ref:startDate\"');
  });

  test('Should return error for uncorrect date', async () => {
    const res = await supertest(app)
      .post('/records')
      .send({
        startDate: '2016-01-23',
        endDate: '2016/26/26',
        minCount: 1000,
        maxCount: 5000,
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.code).toBe(1);
    expect(res.body.msg).toBe('\"endDate\" must be a valid date');
  });
});

describe('Tests for random routes that doesnt exists', () => {
  test('Should return 404 GET /', async () => {
    const res = await supertest(app)
      .get('/');
    expect(res.statusCode).toEqual(404);
    expect(res.body.code).toBe(2);
    expect(res.body.msg).toBe('404 Not found.');
  });
  test('Should return 404 POST /hello', async () => {
    const res = await supertest(app)
      .post('/hello');
    expect(res.statusCode).toEqual(404);
    expect(res.body.code).toBe(2);
    expect(res.body.msg).toBe('404 Not found.');
  });
});
