import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { ApiResponseDto } from "src/common/dtos/open-api-response.dto";
import { PageDto } from "src/common/dtos/page.dto";

export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel, statusCode: number, description: string) => {
    return applyDecorators(
      ApiExtraModels(PageDto),
      ApiOkResponse({
        status: statusCode,
        description: 'Success',
        schema: {
          allOf: [
            { $ref: getSchemaPath(PageDto) },
            {
              properties: {
                data: {
                  type: 'array',
                  items: { $ref: getSchemaPath(model) },
                },
              },
            },
          ],
        },
      }),
    );
};

export const ApiOkObjectResponse = <TModel extends Type<any>>(model: TModel, statusCode: number, description: string) => {
  return applyDecorators(
    ApiExtraModels(ApiResponseDto),
    ApiExtraModels(model),
    ApiOkResponse({
      status: statusCode,
      description: description,
      schema: {
        allOf: [
            { $ref: getSchemaPath(ApiResponseDto) }, /* Wrapper Class */
            { properties: { data: { $ref: getSchemaPath(model)} } } /* Generic Class */
        ],
    }
    }),
  );
};

export const ApiOkArrayResponse = <TModel extends Type<any>>(model: TModel, statusCode: number, description: string) => {
  return applyDecorators(
    ApiExtraModels(ApiResponseDto),
    ApiExtraModels(model),
    ApiOkResponse({
      status: statusCode,
      description: description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};