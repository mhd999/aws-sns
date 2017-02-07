// @flow

import 'babel-polyfill';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import { DB_URL } from './config/config';
import v1 from './routes/v1';

const app = express();
app.use(bodyParser.json());

const whitelist = ['http://localhost:3000'];

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
};

app.use(cors(corsOptions));
app.use('/api/v1', v1);

mongoose.connect(DB_URL);

module.exports = app;
