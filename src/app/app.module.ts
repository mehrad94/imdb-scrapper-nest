import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from 'src/movie/movie.module';
import { SpecialListModule } from 'src/special-list/special-list.module';

@Module({
  imports: [MovieModule, SpecialListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
