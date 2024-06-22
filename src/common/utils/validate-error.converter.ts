import { ValidationError } from "class-validator";

export function convertValidationErrors(errors: ValidationError[]): string[] {
    if (errors.length > 0) {
        let messages = [];
        errors.map(error => error.constraints)
        .forEach(item => {
          messages = messages.concat(Object.keys(item).map(key => item[key]));
        })
        return messages;
    }
    return [];
}