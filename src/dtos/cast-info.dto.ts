import { Expose } from 'class-transformer';

export class CastInfoDto {
  @Expose()
  name: string;
  @Expose()
  character: string;
  @Expose()
  avatar: string;
  @Expose()
  profile: string;
}
