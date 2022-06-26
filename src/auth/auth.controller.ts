import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {RegisterDto} from "./register.dto";
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {

    constructor(private userService: UserService) {
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

}