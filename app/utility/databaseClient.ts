import { Client } from "pg";
export const DBClient = () => {
    return new Client({
        host: "127.0.0.1",
        user: "root",
        database: "exam-db",//for local
        // database: "examdb",//for prod
        password: "bd123456",
        port: 5432
    })
}