import express from 'express';
import pushRoutes from './push';
import notificationRoutes from './notification';
import topicRoutes from './topic';
import endpointRoutes from './endpoint';

const router = express.Router();

router.use('/push/app', pushRoutes);
router.use('/push/app', topicRoutes);
router.use('/push/app', notificationRoutes);
router.use('/push/app', endpointRoutes);

module.exports = router;
