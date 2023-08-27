/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartUserDto } from './dto/cart-user.dto';
import { AddToCartDto } from './dto/add-cart.dto';
import { DiscountDto } from './dto/disc-dto';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('api/programs/sales/cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async findOne(@Query() id: CartUserDto) {
    return await this.cartService.getCart(id);
  }

  @Post('add')
  addToCart(@Body() body: AddToCartDto) {
    return this.cartService.addToCart(body);
  }
  @Delete(':id')
  removeCart(@Param('id') id: number) {
    return this.cartService.removeCart(id);
  }

  @Post('discount')
  createDisc(@Body() desc: DiscountDto) {
    return this.cartService.createDiscount(desc);
  }

  @Get('photo/:nama')
  @Header('Content-Type', `image/${'png' || 'jpg' || 'jpeg'}`)
  @Header('Content-Disposition', 'attachment')
  getStaticFile(@Param('nama') nama: string): StreamableFile {
    const file = createReadStream(join(`${process.cwd()}/uploads/`, nama));
    return new StreamableFile(file);
  }
}
