import { UserDto } from "src/modules/user/dto/UserDto";
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from "src/modules/user/models/user.entity";

export const toUserDto = (user: UserEntity): UserDto => {
    const { id, email } = user
    return { id, email }
}



export const User = createParamDecorator((_, ctx: ExecutionContext): UserDto => {
    const req = ctx.switchToHttp().getRequest()
    return req.user
});