import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { IdmService } from './idm.service';
import { UserInfo } from './entities/idm.entity';
import { AuthGuard } from '../authn/auth.guard';

@Controller('idm')
// @UseGuards(new AuthGuard())
export class IdmController {
  constructor(private readonly idmService: IdmService) {}

  @Post()
  create(@Body() createIdmDto: UserInfo) {
    return this.idmService.createUser(createIdmDto);
  }

  @Get()
  findAll() {
    return this.idmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.idmService.findOne(id);
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
