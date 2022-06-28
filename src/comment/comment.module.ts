import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Post} from "../post/post.entity";
import {CommonModule} from "../common/common.module";
import {Comment} from "./entities/comment.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    CommonModule
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
