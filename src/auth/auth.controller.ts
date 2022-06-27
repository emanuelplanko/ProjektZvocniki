import {BadRequestException, Body, Controller, NotFoundException, Post, Res, UseGuards} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {RegisterDto} from "./register.dto";
import * as bcrypt from 'bcrypt';
import {LoginDto} from "./login.dto";
import {NotFoundError} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Response} from 'express';
import {AuthGuard} from "./auth.guard";

@Controller('auth')
export class AuthController {

    constructor(
    private userService: UserService,
    private jwtService: JwtService
                ) {
    }

    //register je endpoint
    @Post('register')
   async register(@Body() data: RegisterDto) {
        const hashed = await bcrypt.hash(data.password, 12);
        return this.userService.create({
            "first_name": data.first_name,
            "last_name": data.last_name,
            "email": data.email,
            "password": hashed,
        });
    }

    //podobno kot za register(kopiranje)
    @Post('login')
    async login(@Body() data: LoginDto,
                //Response je za vračanje browserju
                @Res({passthrough: true}) response: Response) {
        const user = await this.userService.findOne({email: data.email});
        if (!user) {
            throw new NotFoundException('Uporabnik ne obstaja')
        }

        if (!await bcrypt.compare(data.password,user.password)) {
            throw new BadRequestException('Napačno geslo');
        }

        //kaj se shrani v vmesno fazo
        const jwt = await this.jwtService.signAsync({id: user.id});

        //ime cookija, do njega lahko dostopa samo brskalnik, uporabnik ga ne more sam spreminjat,
        //ni shranjen na disku, samo v brskalniku(to pomeni ta httpOnly:true)
        response.cookie('jwt',jwt,{httpOnly:true});

        return user;
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    logout(@Res({passthrough:true}) response: Response) {
        response.clearCookie('jwt');
        return {
            message: 'Success'
        }
    }

}