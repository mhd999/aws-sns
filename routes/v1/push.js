import express from 'express';
import { createApp, findAppbyId, findApp } from '../../middlewares/push';

const router = express.Router();

router.route('/')
  .post(createApp);

router.route('/:id')
  .get(findAppbyId)
  .put(findApp);

module.exports = router;
