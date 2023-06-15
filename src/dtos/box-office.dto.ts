import { Expose } from 'class-transformer';

export class BoxOfficeDto {
  @Expose()
  id: string;
  @Expose()
  title: string;
  @Expose()
  weekend: string;
  @Expose()
  gross: string;
  @Expose()
  weeks: string;
  @Expose()
  poster: string;
  @Expose()
  url: string;
}
