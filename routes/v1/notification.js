import express from 'express';
import { publishNotification } from '../../middlewares/notification';
import { findTopicMiddleware } from '../../middlewares/topic';

const router = express.Router();

router.route('/:id/topic/:name/notification')
  .post(findTopicMiddleware, publishNotification);

module.exports = router;
