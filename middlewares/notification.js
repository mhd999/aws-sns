// @flow

import { sns } from './aws';

export function publishNotification(req: any, res: any) {
  let payload = {
    default: req.body.message,
    APNS: {
      aps: {
        alert: {
          message: req.body.message,
        },
      },
    },
    GCM: {
      data: {
        message: {
          message: req.body.message,
        },
      },
    },
  };

  payload = JSON.stringify(payload);

  try {
    sns.publish({
      Message: payload,
      MessageStructure: 'json',
      TargetArn: req.body.TargetArn,
      TopicArn: req.topic.topic_arn,
    }, (err) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.status(200).json({ message: 'Notifcation sent' });
      }
    });
  } catch (err) {
    throw err;
  }
}
