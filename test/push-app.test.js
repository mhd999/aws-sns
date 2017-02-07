import request from 'supertest';
import { describe, it, after, before } from 'mocha';
import { expect } from 'chai';
import App from '../models/app';

const app = require('../app');

const agent = request.agent(app);

let appSaved;

before((done) => {
  agent.post('/api/v1/push/app/').send({
    name: 'fake-app',
  })
  .end((error, response) => {
    if (error) {
      return done(error);
    }
    appSaved = response.body;
    return done();
  });
});

describe('Push notificaiton app api', () => {
  it('should create an app', (done) => {
    const appData = {
      name: 'test-app',
      appId: '1234',
      apns_env: 'developemnt',
      apns_p12: 'XXYYZZ',
      apns_p12_password: '123',
      gcm_key: 'YYZZXX',
      android_gcm_sender_id: '123CCVV',
    };
    agent.post('/api/v1/push/app/')
    .send(appData)
    .expect(201)
    .end((error, response) => {
      expect(response.body).to.be.an('object');
      done();
    });
  });

  it('should fetch app by id', (done) => {
    agent.get(`/api/v1/push/app/${appSaved._id}`)
    .expect(200)
    .end((error, response) => {
      expect(response.body._id).to.equal(appSaved._id);
      done();
    });
  });
});

it('should update app', (done) => {
  const appData = {
    name: 'update-fake-app',
  };
  agent.put(`/api/v1/push/app/${appSaved._id}`)
  .send(appData)
  .expect(201)
  .end((error, response) => {
    expect(response.body).to.be.an('object');
    done();
  });
});

after((done) => {
  App.remove({}, done);
});
