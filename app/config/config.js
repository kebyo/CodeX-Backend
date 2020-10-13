import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT,
    mongoPass: process.env.MONGO_PASS,
    dbName: process.env.DB_NAME,
}

export default config; 