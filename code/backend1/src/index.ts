import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';

import appRouter from './routes';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';

// Clerk imports
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import { requestLogger } from './middlewares/logs_midddleware';

dotenv.config();

const app: Application = express();

app.use(requestLogger);

app.use(express.json());
app.use(cors());

// Clerk middleware: attaches req.auth to all requests
app.use(ClerkExpressWithAuth());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.use(appRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
