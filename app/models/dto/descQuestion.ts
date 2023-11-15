import { IsNotEmpty } from 'class-validator'
export class DescQuestion {

    @IsNotEmpty()
    question: string;
    @IsNotEmpty()
    probableAnswer: string;
    @IsNotEmpty()
    isOptionalQuestion: boolean;
}