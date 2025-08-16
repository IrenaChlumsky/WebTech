import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

const { PORT = 3000, MONGO_URI } = process.env;

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB verbunden');

    app.get('/health', (req, res) => {
      res.json({ ok: true });
    });

    app.listen(PORT, () => {
      console.log(`✅ API läuft auf http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ DB-Verbindungsfehler:', err.message);
    process.exit(1);
  }
}

start();
