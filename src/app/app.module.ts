import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from 'src/movie/movie.module';
import { SpecialListModule } from 'src/special-list/special-list.module';
import { UtilityModule } from 'src/utility/utility.module';

@Module({
  imports: [MovieModule, SpecialListModule, UtilityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
