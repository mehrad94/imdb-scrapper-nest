import { Controller, Get } from '@nestjs/common';
import { getHtml } from 'src/utils';
import { URL_BOX_OFFICE } from 'src/values/constant';
import { SpecialListService } from './special-list.service';

@Controller('special-list')
export class SpecialListController {
  constructor(private specialListService: SpecialListService) {}
  @Get('/box-office')
  async getBoxOffice() {
    return this.specialListService.getBoxOffice();
  }
}
