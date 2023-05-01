import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoute from './routes/postRoutes.js';
import lollipopRoutes from './routes/lollipopRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoute);
app.use('/api/v1/lollipop', lollipopRoutes);

app.get('/', async (req, res) => {
    res.status(200).json({
        message: 'Hello from lollipop',
    });
});

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server started on port http://localhost:8080'));
    } catch (error) {
        console.log(error);
    }
};

startServer();