import { ApiProperty } from "@nestjs/swagger";

export class ApiResponseDto<T> {
    @ApiProperty({default: 200})
    statusCode: number;

    @ApiProperty({default: 'Success'})
    message: string;

    error: string;

    @ApiProperty()
    data: T;

    constructor(statusCode: number, message: string, data: T) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}