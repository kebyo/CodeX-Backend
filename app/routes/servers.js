import express from 'express';
import ServersController from '../controllers/servers';

const router = express.Router();

router.get('/', ServersController.getAll);

router.get('/:id', ServersController.getByID);

export default router