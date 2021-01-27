import { Get, Query } from '@nestjs/common';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../utils/utils';
import { UserDto } from '../user/dto/UserDto';
import { ConvertOrderService } from './convertOrder.service';
import { CreateConvertOrderDto } from './dto/CreateConvertOrderDto';
import { GetExchangeRateDto } from './dto/GetExchangeRateDto';

@Controller('convert')
export class ConvertOrderController {
    constructor(private readonly convertOrderService: ConvertOrderService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    createConvertOrder(@User() user: UserDto, @Body() createConvertOrderDto: CreateConvertOrderDto) {
        const createConvertOrderDtoWithUserId: CreateConvertOrderDto = {
            id_user: user.id,
            ...createConvertOrderDto
        }
        return this.convertOrderService.createConvertOrder(createConvertOrderDtoWithUserId)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('rate')
    exchangeRate(@Query() getExchangeRateDto: GetExchangeRateDto) {
        return this.convertOrderService.getExchangeRate(getExchangeRateDto)
    }





}
