import { Router } from 'express';
import { getUsers, getUserWithID } from '../controllers/crmController';

const router = Router();

// router.use('/', (req, res, next) => {
//   console.log(`Request from: ${req.originalUrl}`);
//   console.log(`Request type: ${req.method}`);
//   next();
// });

router.get('/', (req, res) => {
  res.send('nothing to see here');
});

router.get('/users', getUsers);
router.get('/users/:id', getUserWithID);

export default router;
