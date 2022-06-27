import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./user.entity";
import {Request} from 'express';
import {JwtService} from "@nestjs/jwt";
import {AuthGuard} from "../auth/auth.guard";

//karkoli v tem controllerju je zaščiteno s guardom
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
        private jwtService: JwtService) {
    }

    //all je funkcija
    //zadnji del na koncu: /
    //pri GET je v oklepaju "users" endpoint
    @Get()
    all() {
        return this.userService.all();
    }


    @Get('profile')
    async profile(@Req() request: Request) {
        const token = request.cookies['jwt'];

        const data = await this.jwtService.verifyAsync(token);

        return this.userService.findOne({id: data.id});
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

    //metoda je @Delete, funkcija je delete
    @Delete(':id')
    delete(@Param('id') id:number): Promise<any> {
        return this.userService.delete(id);
    }
}
