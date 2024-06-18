import { ArgumentsHost, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";
import { ApiResponseDto } from "../dtos/open-api-response.dto";
import { randomUUID } from "crypto";

export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        
        const errorId = randomUUID();
        const responseBody = exception.getResponse() as ApiResponseDto<any>;
        console.log('errorId: ' + errorId, ' -> url: ' + request.url)
        console.log('errorId: ' + errorId, ' -> requestBody: ', request.body);
        console.log('errorId: ' + errorId, ' -> responseBody: ', responseBody);
        response
        .status(status)
        .json({
            statusCode: status,
            message: responseBody ? responseBody.message : exception.message,
            error: responseBody ? responseBody.error : exception.name,
            timestamp: new Date().toISOString(),
            path: request.url,
            errorId: errorId
        });
    }
}