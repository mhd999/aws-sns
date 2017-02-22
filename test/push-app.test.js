import request from 'supertest';
import { describe, it, after, before } from 'mocha';
import { expect } from 'chai';
import App from '../models/app';

const app = require('../app');

const agent = request.agent(app);

let appSaved;

before((done) => {
  agent.post('/api/v1/app/').send({
    name: "app13",
	  gcm_key: "AIzaSyAf-g69dNjCsaaXFJT5q8zCCZZDDSDWDWD",
	  platform: "GCM"
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
  it('should create end point', (done) => {
    const endpointData = {
      token: "123xxx456yyyvvvkkkk",
    };
    agent.post(`/api/v1/app/${appSaved._id}/endpoint`)
    .send(endpointData)
    .expect(201)
    .end((error, response) => {
      expect(response.body).to.be.an('object');
      done();
    });
  });

  it('should create topic', (done) => {
    const topicData = {
      name: "fake-topic",
    };
    agent.post(`/api/v1/app/${appSaved._id}/topic`)
    .send(topicData)
    .expect(201)
    .end((error, response) => {
      expect(response.body).to.be.an('object');
      done();
    });
  });
});

it('should send notification to topic', (done) => {
  const notificationData = {
    message: "Hello world",
  };
  agent.post(`/api/v1/app/${appSaved._id}/topic/fake-topic/notification`)
  .send(notificationData)
  .expect(200)
  .end((error, response) => {
    console.log(response.body);
    expect(response.body.message).to.equal('Notifcation sent');
    done();
  });
});

// after((done) => {
//   App.remove({}, done);
// });
