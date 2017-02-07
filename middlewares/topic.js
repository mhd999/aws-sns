// @flow

import Topic from '../models/topic';
import { sns } from './aws';

export function create(req: any, res: any) {
  const params = {
    Name: req.body.name,
  };
  try {
    sns.createTopic(params, (err, data) => {
      if (err) {
        res.status(500).json({ message: err });
      } else if (req.topic) {
        res.status(200).json({ message: 'topic already exist', topic: req.topic });
      } else {
        const topicData = {
          name: req.body.name,
          topic_arn: data.TopicArn,
          app: req.params.id,
        };
        const topic = new Topic(topicData);
        topic.save()
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

export function deleteTopic(req: any, res: any) {
  const params = {
    TopicArn: req.topic.topic_arn,
  };
  try {
    sns.deleteTopic(params, (err) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        Topic.remove({ _id: req.topic._id })
          .then(() => {
            res.status(200).json({ message: 'Topic deleted' });
          }).catch((error) => {
            res.status(500).json({ message: error });
          });
      }
    });
  } catch (err) {
    throw err;
  }
}

export function findTopicMiddleware(req: any, res: any, next: any) {
  Topic.findOne({ name: req.params.name }, (err, topic) => {
    if (err) {
      return next(err);
    }
    if (!topic) {
      return next('Topic not found');
    }
    req.topic = topic;
    return next();
  });
}

export function findTopic(req: any, res: any, next: any) {
  Topic.findOne({ name: req.body.name }, (err, topic) => {
    if (err) {
      return next(err);
    }
    if (!topic) {
      return next();
    }
    req.topic = topic;
    return next();
  });
}
