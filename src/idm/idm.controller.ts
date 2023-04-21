import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { IdmService } from './idm.service';
import { UserInfo } from './entities/idm.entity';

@Controller('idm')
export class IdmController {
  constructor(private readonly idmService: IdmService) { }

  @Post()
  create(@Body() createIdmDto: UserInfo) {
    return this.idmService.createUser(createIdmDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateIdmDto: Partial<UserInfo>) {
    return this.idmService.update(id, updateIdmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.idmService.remove(id);
  }
}
