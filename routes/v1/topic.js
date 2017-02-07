import express from 'express';
import { findApp } from '../../middlewares/push';
import { create, deleteTopic, findTopicMiddleware, findTopic } from '../../middlewares/topic';

const router = express.Router();

router.route('/:id/topic')
  .post(findApp, findTopic, create);

router.route('/:id/topic/:name')
  .delete(findTopicMiddleware, deleteTopic);

module.exports = router;
