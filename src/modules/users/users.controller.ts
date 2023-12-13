import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthRequired, User } from 'src/shared/decorators/auth.decorator';

@Controller('users')
@ApiTags('Users')
@AuthRequired()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('check-auth')
    checkAuth(@User('userId') userId: number) {
        console.log("🚀 ~ file: users.controller.ts:24 ~ UsersController ~ checkAuth ~ userId:", userId)
        return true;
    }

    // @Post()
    // create(@Body() createUserDto: CreateUserDto) {
    //     return this.usersService.create(createUserDto);
    // }

    // @Get()
    // findAll() {
    //     return this.usersService.findAll();
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //     return this.usersService.update(+id, updateUserDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.usersService.remove(+id);
    // }
}
