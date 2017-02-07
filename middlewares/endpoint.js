// @flow

import { sns } from './aws';

export function createEndPoint(req: any, res: any) {
  const params = {
    PlatformApplicationArn: req.app.platform_application_arn,
    Token: req.body.token,
  };
  try {
    sns.createPlatformEndpoint(params, (err, data) => {
      res.status(200).json({ data });
    });
  } catch (err) {
    throw err;
  }
}

export function deleteEndPoint(req: any, res: any) {
  const params = {
    EndpointArn: req.body.endpointarn,
  };
  try {
    sns.deleteEndpoint(params, (err, data) => {
      res.status(200).json({ message: 'Endpoint deleted', data });
    });
  } catch (err) {
    throw err;
  }
}
