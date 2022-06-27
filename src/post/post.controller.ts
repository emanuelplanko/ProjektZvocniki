import {Body, Controller, Delete, Get, Param, Post, Put, Req, UnauthorizedException, UseGuards} from '@nestjs/common';
import {PostService} from "./post.service";
import {AuthGuard} from "../auth/auth.guard";
import {JwtService} from "@nestjs/jwt";
import {CreatePostDto} from "./create-post.dto";
import {Request} from "express";
import {UpdatePostDto} from "./update-post.dto";

@UseGuards(AuthGuard)
@Controller('post')
export class PostController {

    constructor(private postService:PostService,
                private jwtService: JwtService) {
    }

    //@Get proži funkcijo getAll, ki vrača iz post.service.ts funkcijo getAll
    @Get()
    getAll () {
        return this.postService.getAll();
    }

    @Post()
    async create (
        @Body() data: CreatePostDto,
        @Req() request: Request) {

        const jwt = request.cookies['jwt'];
        const user = await this.jwtService.verifyAsync(jwt);

        return this.postService.create({
            title: data.title,
            content: data.content,
            subject_id: data.subject_id,
            user: {id: user.id}
        });

    }

    @Get(':id')
    getOne(@Param('id') id:number) {
        return this.postService.findOne(id);
    }

    @Delete(':id')
    async delete (
        @Param('id') id:number,
        @Req() request: Request) {

        const jwt = request.cookies['jwt'];
        const user = await this.jwtService.verifyAsync(jwt);

        const post = await this.getOne(id);
        //preverim, če je lastnik
        if (post.user.id != user.id) {
            throw new UnauthorizedException('Nisi lastnik!');
        }

        return this.postService.delete(id);
    }

    @Put(':id')
   async update (
        @Param('id') id:number,
        @Body() data: UpdatePostDto,
        @Req() request: Request
    ) {
        const jwt = request.cookies['jwt'];
        const user = await this.jwtService.verifyAsync(jwt);

        const post = await this.getOne(id);
        //preverim, če je lastnik
        if (post.user.id != user.id) {
            throw new UnauthorizedException('Nisi lastnik!');
        }

        return this.postService.update(id,data);
    }
}
