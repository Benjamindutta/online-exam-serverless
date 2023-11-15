import { failureResponse, successResponse } from "../utility/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { QuestionRepository } from '../repository/questionRepository'
import { autoInjectable } from 'tsyringe';
import { plainToClass } from 'class-transformer'
import { OptionalQuestion } from "../models/dto/optionalQuestion";
import { AppValidationError } from "../utility/errors";
import { DescQuestion } from '../models/dto/descQuestion'
import { DescAnswer } from "../models/dto/descAnswer";
import { OptionalAnswer } from "../models/dto/optionalAnswer";
@autoInjectable()
export class QuestionService {
    repository: QuestionRepository
    constructor(repository: QuestionRepository) {
        this.repository = repository;
    }
    async createQuestion(event: APIGatewayProxyEventV2) {
        const Body: any = event.body;
        // console.log(typeof optionalBody)
        if (Body?.isOptionalQuestion) {
            return this.createOptonalQuestion(event);
        } else {
            return this.createDescQuestion(event);
        }
    }
    async createOptonalQuestion(event: APIGatewayProxyEventV2) {
        try {
            const input: OptionalQuestion = plainToClass(OptionalQuestion, event.body);
            // console.log(event.body);
            const error = await AppValidationError(input);
            if (error) {
                return failureResponse(404, error);
            }
            // return successResponse({ message: "response from createQuestion" });
            const data = await this.repository.saveOptionalQuestion({
                question: input.question,
                optionA: input.optionA,
                optionB: input.optionB,
                optionC: input.optionC,
                optionD: input.optionD,
                correctOption: input.correctOption
            })

            return successResponse(data);
        } catch (error) {
            console.log(error);
            return failureResponse(500, error);
        }

    }
    async createDescQuestion(event: APIGatewayProxyEventV2) {
        try {
            const input: DescQuestion = plainToClass(DescQuestion, event.body);
            // console.log(event.body);
            const error = await AppValidationError(input);
            if (error) {
                return failureResponse(404, error);
            }
            // return successResponse({ message: "response from createQuestion" });
            // return this.repository.saveDescQuestion(event.body);
            const data = await this.repository.saveDescQuestion({
                question: input.question,
                probableAnswer: input.probableAnswer,
            })
            console.log(data);
            return successResponse(data);
        } catch (error) {
            console.log(error);
            return failureResponse(500, error);
        }
    }
    async submitExam(event: APIGatewayProxyEventV2) {
        const Body: any = event.body;
        // console.log(typeof optionalBody)
        if (Body?.isOptionalAnswer) {
            return this.createOptonalAnswer(event);
        } else {
            return this.createDescAnswer(event);
        }
    }
    async createDescAnswer(event: APIGatewayProxyEventV2) {
        try {
            const input: DescAnswer = plainToClass(DescAnswer, event.body);
            // console.log(event.body);
            const error = await AppValidationError(input);
            if (error) {
                return failureResponse(404, error);
            }

            const data = await this.repository.saveDescAnswer({
                question_id: input.question_id,
                answer: input.answer,
                image_url: input.image_url
            })
            console.log(data);
            return successResponse(data);
        } catch (error) {
            console.log(error);
            return failureResponse(500, error);
        }

    }
    async createOptonalAnswer(event: APIGatewayProxyEventV2) {
        try {
            const input: OptionalAnswer = plainToClass(OptionalAnswer, event.body);
            // console.log(event.body);
            const error = await AppValidationError(input);
            if (error) {
                return failureResponse(404, error);
            }

            const data = await this.repository.saveOptionalAnswer({
                question_id: input.question_id,
                answer: input.givenAnswer,
            })
            console.log(data);
            return successResponse(data);
        } catch (error) {

        }
    }
    async getExamQuestions(event: APIGatewayProxyEventV2) {

        try {
            const optionalQuestion: number = 5 + Math.floor(Math.random() * 3);
            const descQuestion: number = 10 - optionalQuestion;
            const data = await this.repository.getQuestions(optionalQuestion, descQuestion);
            console.log(data);
            return successResponse(data);
        } catch (error) {
            console.log(error);
            return failureResponse(500, error);
        }

    }
}