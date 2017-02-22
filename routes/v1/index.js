import express from 'express';
import appRoutes from './app';
import notificationRoutes from './notification';
import topicRoutes from './topic';
import endpointRoutes from './endpoint';

const router = express.Router();

router.use('/app', appRoutes);
router.use('/app', topicRoutes);
router.use('/app', notificationRoutes);
router.use('/app', endpointRoutes);

module.exports = router;
