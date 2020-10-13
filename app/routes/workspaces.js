import express from 'express';
import WorkspacesController from '../controllers/workspaces';

const router = express.Router();

router.post('/', WorkspacesController.add);

router.get('/:id', WorkspacesController.getById);

router.get('/:id/servers', WorkspacesController.getServers);

router.get('/:id/servers/:serverId', WorkspacesController.getServerById);

export default router;