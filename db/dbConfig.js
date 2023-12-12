import mysql from "mysql2";
import dotEnv from "dotenv";

dotEnv.config();

const dbConfig = () => {
  return mysql.createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    database: process.env.SQL_DATABASE,
    password: process.env.SQL_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
};

export default dbConfig;
