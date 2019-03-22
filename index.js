import express from 'express';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';

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

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) => res.send(`Node and express server is running on port ${PORT}`));

app.listen(PORT, () => console.log(`your server is running on port ${PORT}`));
