import { Expose, Transform } from 'class-transformer';

export class MovieDto {
  @Expose()
  id: string;
  @Expose()
  title: string;
}
