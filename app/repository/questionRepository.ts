import { DBClient } from "../utility/databaseClient";
import { DescModel } from "../models/descModel";
import { OptionalModel } from '../models/optionalModel'
export class QuestionRepository {



    constructor() { }
    async saveDescQuestion({ question, probableAnswer }: DescModel) {
        try {
            const client = await DBClient();
            await client.connect();
            const queryString = "INSERT INTO descquestions(question,probable_answer) VALUES($1,$2) RETURNING *";
            const values = [question, probableAnswer];
            const result = await client.query(queryString, values);
            await client.end();
            console.log(result);
            if (result.rowCount > 0) {
                return { ...result.rows[0], probableAnswer: result.rows[0].probable_answer, isOptionalQuestion: false };
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async saveOptionalQuestion({ question, optionA, optionB, optionC, optionD, correctOption }: OptionalModel) {
        try {
            const client = await DBClient();
            await client.connect();
            const queryString = "INSERT INTO optionalquestions(question,option_a,option_b,option_c,option_d,correct_option) VALUES($1,$2,$3,$4,$5,$6) RETURNING *";
            const values = [question, optionA, optionB, optionC, optionD, correctOption];
            const result = await client.query(queryString, values);
            await client.end();
            console.log(result);
            if (result.rowCount > 0) {
                return { ...result.rows[0], isOptionalQuestion: true };
            }
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    }
    async getQuestions(optionalQuestion: number, descQuestion: number) {
        try {
            const client = await DBClient();
            await client.connect();
            const queryStringOptional = "SELECT * FROM optionalquestions ORDER BY RANDOM() LIMIT $1";
            const valuesOptional = [optionalQuestion];
            const resultOptional = await client.query(queryStringOptional, valuesOptional);
            const queryStringDesc = "SELECT * FROM descquestions ORDER BY RANDOM() LIMIT $1";
            const valuesDesc = [descQuestion];
            const resultDesc = await client.query(queryStringDesc, valuesDesc);
            await client.end();
            // console.log(resultDesc.rows, resultOptional.rows);
            return {
                "optionalQuestions": resultOptional.rows,
                "descQuestions": resultDesc.rows
            }
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }

    }
    async saveDescAnswer(answer: { question_id: number, answer: string, image_url: string }) {
        try {
            const client = await DBClient();
            await client.connect();
            const queryString = "INSERT INTO descanswer(question_id,answer,image_url) VALUES($1,$2,$3) RETURNING *";
            const values = [answer.question_id, answer.answer, answer.image_url];
            const result = await client.query(queryString, values);
            await client.end();
            console.log(result);
            if (result.rowCount > 0) {
                return result.rows[0];
            }
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    }

    async saveOptionalAnswer(answer: { question_id: number, answer: string }) {
        try {
            const client = await DBClient();
            await client.connect();
            const queryString = "INSERT INTO optionalanswer(question_id,answer) VALUES($1,$2) RETURNING *";
            const values = [answer.question_id, answer.answer];
            const result = await client.query(queryString, values);
            await client.end();
            console.log(result);
            if (result.rowCount > 0) {
                return result.rows[0];
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}