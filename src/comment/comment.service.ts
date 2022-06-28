import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Post} from "../post/post.entity";
import {Repository} from "typeorm";
import {Comment} from "../comment/entities/comment.entity";

@Injectable()
export class CommentService {
  constructor(
      @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>
  ) {
  }
  create(data): Promise<Comment> {
    return this.commentRepository.save(data);
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
