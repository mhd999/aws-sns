// @flow

import App from '../models/app';
import { sns } from './aws';

export async function createApp(req: any, res: any) {
  const params = {
    Attributes: {
      PlatformCredential: req.body.gcm_key,
    },
    Name: req.body.name,
    Platform: req.body.platform,
  };
  try {
    sns.createPlatformApplication(params, (err, data) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        const appData = {
          name: req.body.name,
          gcm_key: req.body.gcm_key,
          platform_application_arn: data.PlatformApplicationArn,
          request_id: data.ResponseMetadata.RequestId,
        };
        const app = new App(appData);
        app.save()
          .then((dataSaved) => {
            res.status(201).json(dataSaved);
          }).catch((error) => {
            res.status(500).json({ message: error });
          });
      }
    });
  } catch (err) {
    throw err;
  }
}


export async function findAppbyId(req: any, res: any) {
  try {
    const app = await App.findOne({ _id: req.params.id });
    if (app) {
      res.status(200).json(app);
    }
    res.status(400).json({ message: `App with id ${req.params.id} not found` });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
    throw err;
  }
}

export function findApp(req: any, res: any, next: any) {
  App.findOne({ _id: req.params.id }, (err, app) => {
    if (err) {
      return next(err);
    }
    if (!app) {
      return next('App not found');
    }
    req.app = app;
    return next();
  });
}
