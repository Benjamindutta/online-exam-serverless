CREATE TABLE optionalQuestions(
    "question_id" bigserial PRIMARY KEY,
    "question" text NOT NULL,
    "option_a" varchar NOT NULL,
    "option_b" varchar NOT NULL,
    "option_c" varchar NOT NULL,
    "option_d" varchar NOT NULL,
    "correct_option" varchar NOT NULL
)

CREATE TABLE descQuestions(
    "question_id" bigserial PRIMARY KEY,
    "question" text NOT NULL,
    "probable_answer" text NOT NULL
)

CREATE TABLE descAnswer(
    "_id" bigserial PRIMARY KEY,
    "question_id" integer NOT NULL,
    "answer" text NOT NULL,
    "image_url" varchar
)
CREATE TABLE optionalAnswer(
    "_id" bigserial PRIMARY KEY,
    "question_id" integer NOT NULL,
    "answer" varchar NOT NULL
)

