import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('api/client')
export class ClientController {
  constructor(private Services: ClientService) {}

  @Get()
  async GetAll() {
    return this.Services.FindAll();
  }

  @Get(':id')
  async GetOne(@Param('id', ParseIntPipe) id: number) {
    return this.Services.FindOne(id);
  }

  @Post()
  async Create(@Body() createClientDto: CreateClientDto) {
    return this.Services.Create(createClientDto);
  }

  @Put(':id')
  async Update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClient: UpdateClientDto,
  ) {
    return this.Services.Update(id, updateClient);
  }

  @Delete(':id')
  async Delete(@Param('id', ParseIntPipe) id: number) {
    return this.Services.Delete(id);
  }
}
