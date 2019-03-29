import express from 'express';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
import router from './routes/crmRoutes';

const app = express();
const PORT = 3000;

// helmet setup
app.use(helmet());

// Rate Limit Setup
const limiter = new RateLimit({
  windowsMs: 15 * 60 * 1000, // 15min window
  max: 100, // max request 100 per ip
  delayMs: 0, // disable delay
});
app.use(limiter);

// parser
app.use(express.json());

const endpoints = JSON.stringify({
  api_entry: `http://localhost:${PORT}/api`,
  users_url: `http://localhost:${PORT}/api/users{/user_id}`,
})
  .split(',')
  .join(', <br/>');

app.get(
  '/',
  (req, res, next) => {
    // log middleware
    console.log(`Request from: ${req.originalUrl} with ip: ${req.ip}`);
    console.log(`Request type: ${req.method}`);
    next();
  },
  (req, res) => res.send(`Node and express server is running on port ${PORT} <br/> end points: <br/><br/> ${endpoints}`),
);

app.use('/api', router);

// 404 for unspecified routes and methods
app.all('/*', (req, res) => {
  res.status(404).send('404 NOT FOUND');
});

app.listen(PORT, () => console.log(`your server is running on port ${PORT}`));
