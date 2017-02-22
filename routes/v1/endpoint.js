import express from 'express';
import { createEndPoint, deleteEndPoint } from '../../middlewares/endpoint';
import { findApp } from '../../middlewares/app';

const router = express.Router();

router.route('/:id/endpoint')
  .post(findApp, createEndPoint)
  .delete(deleteEndPoint);

module.exports = router;
