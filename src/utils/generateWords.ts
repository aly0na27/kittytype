import {faker} from "@faker-js/faker";

export function generateWords(wordsCount: number): string[] {
    return faker.word.words({count: wordsCount}).split(' ')
}
