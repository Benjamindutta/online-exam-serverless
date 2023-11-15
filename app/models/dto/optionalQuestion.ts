import { IsNotEmpty, } from "class-validator";
export class OptionalQuestion {
    @IsNotEmpty()
    question: string;
    @IsNotEmpty()
    optionA: string;
    @IsNotEmpty()
    optionB: string;
    @IsNotEmpty()
    optionC: string;
    @IsNotEmpty()
    optionD: string;
    @IsNotEmpty()
    correctOption: string;
    @IsNotEmpty()
    isOptionalQuestion: boolean;
}