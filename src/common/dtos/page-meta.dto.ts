import { ApiProperty } from "@nestjs/swagger";
import { PageMetaDtoParameters } from "src/common/interface/page-meta-dto-parameters";

export class PageMetaDto {
  @ApiProperty({default: 1})
  readonly page: number;

  @ApiProperty({default: 10})
  readonly limit: number;

  @ApiProperty({default: 10})
  readonly itemsCount: number;

  @ApiProperty({default: 1})
  readonly pagesCount: number;

  @ApiProperty({default: false})
  readonly hasPreviousPage: boolean;

  @ApiProperty({default: false})
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.limit = pageOptionsDto.limit;
    this.itemsCount = itemCount;
    this.pagesCount = Math.ceil(this.itemsCount / this.limit);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pagesCount;
  }
}