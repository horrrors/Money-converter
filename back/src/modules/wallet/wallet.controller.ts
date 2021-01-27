import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../../src/utils/utils';
import { UserDto } from '../user/dto/UserDto';
import { CreateWalletDto } from './dto/CreateWalletDto';
import { WalletEntity } from './models/wallet.entity';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
    constructor(
        private readonly walletServise: WalletService
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    getAll(@User() user: UserDto): Promise<WalletEntity[]> {
        return this.walletServise.getAllUserWallets(user)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    createWallet(@User() user: UserDto, @Body() createWalletDto: CreateWalletDto) {
        const createWaletDtoWithUserId = {
            user_id: user.id,
            ...createWalletDto
        }
        return this.walletServise.createWallet(createWaletDtoWithUserId)
    }
}
