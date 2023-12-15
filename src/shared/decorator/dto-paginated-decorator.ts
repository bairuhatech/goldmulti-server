import { Type, applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { DataResponseDtoPagination } from "../dto/data_response_dto_pagination";
import { PageMetaDto } from "../dto/page-meta.dto";

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel
) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiExtraModels(DataResponseDtoPagination),
    ApiExtraModels(PageMetaDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(DataResponseDtoPagination) },
          {
            properties: {
              data: {
                type: "array",
                items: { $ref: getSchemaPath(model) },
              },
              meta: {
                type: "object",
                $ref: getSchemaPath(PageMetaDto),
              },
            },
          },
        ],
      },
    })
  );
};
