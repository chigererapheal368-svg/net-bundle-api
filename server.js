import express from 'express';
import { Pool } from 'pg';
import crypto from 'crypto';

const app = express();
app.use(express.json());

const dbPool = new Pool({ connectionString: process.env.DATABASE_URL });

function generateGlobalNineDigitId() {
    const min = 100000000;
    const max = 999999999;
    const num = Math.floor(crypto.randomInt(min, max)).toString();
    return `${num.slice(0,3)}-${num.slice(3,6)}-${num.slice(6,9)}`;
}

app.post('/api/v1/auth/register', async (req, res) => {
    const { fullName, phoneNumber, email } = req.body;
    const assignedId = generateGlobalNineDigitId();
    console.log(`[NET BUNDLE] Registration: ${fullName}`);
    return res.status(201).json({
        success: true,
        message: "Global Net Bundle ID activated!",
        netBundleId: assignedId,
        user: { fullName, phoneNumber, email }
    });
});

app.get('/', (req, res) => res.send('NET BUNDLE Worldwide Engine is Live!'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Engine running on port ${PORT}`));
