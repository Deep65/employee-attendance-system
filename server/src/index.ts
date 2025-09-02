import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from '@config/db';

const app = express();
app.use(cors());
app.use(express.json());


app.get('/health', (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));

const PORT = process.env.PORT || 4000;

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
  });
})();

