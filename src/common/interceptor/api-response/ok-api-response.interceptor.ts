import { CallHandler, ExecutionContext, HttpStatus, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

export class OkApiResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>)
        : Observable<any> | Promise<Observable<any>> {
        context.switchToHttp()
            .getResponse()
            .status(HttpStatus.OK);
        return next.handle().pipe(map((data: any) => {
            return {
                statusCode: HttpStatus.OK,
                message: 'Success',
                data: data
            };
        }))
    }

}