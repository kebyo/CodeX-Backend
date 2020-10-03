import express from 'express';
import AgentsController from '../controllers/agents';

const router = express.Router();

router.patch('/', AgentsController.updateInfo);

export default router;