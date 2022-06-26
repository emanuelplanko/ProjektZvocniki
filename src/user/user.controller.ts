import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./user.entity";

@Controller('users')
export class UserController {
    constructor(
        private userService: UserService) {
    }

    //all je funkcija
    //zadnji del na koncu: /
    //pri GET je v oklepaju "users" endpoint
    @Get('users')
    all() {
        return this.userService.all();
    }

    //select Body in POSTMAN
    @Post('user')
    create (@Body() data): Promise<User> {
        return this.userService.create(data);
    }

    @Get(':id')
    getUserById(@Param('id') id: number) :Promise<User> {
        return this.userService.findOne({id});
    }

    //metoda za update
    @Put(':id')
    async update(
        @Param('id') id:number,
        @Body() data
    ) : Promise<User> {
        return await this.userService.update(id, data);
    }

    //metoda je @Delete, funcija je delete
    @Delete(':id')
    delete(@Param('id') id:number): Promise<any> {
        return this.userService.delete(id);
    }

}
