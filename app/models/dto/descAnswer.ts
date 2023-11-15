import { IsNotEmpty } from 'class-validator'
export class DescAnswer {
    @IsNotEmpty()
    question_id: number;
    @IsNotEmpty()
    answer: string;
    @IsNotEmpty()
    image_url: string;
    @IsNotEmpty()
    isOptionalAnswer: boolean;
}