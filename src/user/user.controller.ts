import {Controller, Get} from '@nestjs/common';

@Controller('users')
export class UserController {


// all je funkcija
    @Get()
    all() {
        return 'VSS je zakon!';
    }

}
