import { Client } from "pg";
export const DBClient = () => {
    return new Client({
        host: "question-service.cl3i5hnhf14q.ap-south-1.rds.amazonaws.com",
        user: "root",
        // database: "exam-db",//for local
        database: "examdb",
        password: "bd123456",
        port: 5432
    })
}