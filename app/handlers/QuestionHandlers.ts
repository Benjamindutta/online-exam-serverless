import { QuestionService } from "../service/questionService";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { container } from 'tsyringe'
import middy from '@middy/core';
import bodyParser from '@middy/http-json-body-parser'
const service = container.resolve(QuestionService);
export const addQuestion = middy((event: APIGatewayProxyEventV2) => {
    return service.createQuestion(event);
}).use(bodyParser())
export const getExam = middy((event: APIGatewayProxyEventV2) => {
    return service.getExamQuestions(event);
}).use(bodyParser());

export const submitExam = middy((event: APIGatewayProxyEventV2) => {
    return service.submitExam(event);
}).use(bodyParser());