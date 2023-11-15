import { IsNotEmpty } from 'class-validator'
export class OptionalAnswer {
    @IsNotEmpty()
    question_id: number;
    @IsNotEmpty()
    givenAnswer: string;
    @IsNotEmpty()
    isOptionalAnswer: boolean;
}