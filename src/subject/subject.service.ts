import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Subject} from "./subject.entity";

@Injectable()
export class SubjectService {
    constructor(
        @InjectRepository(Subject) private readonly subjectRepository: Repository<Subject>
    ) {
    }

    getAll(): Promise<Subject[]>{
        return this.subjectRepository.find();
    }

    findOne(id:number): Promise<Subject> {
       return  this.subjectRepository.findOne({id});
    }

    create(data): Promise<Subject> {
      return this.subjectRepository.save(data);
    }

    delete(id:number) {
        this.subjectRepository.delete({id});
    }

   async update(id:number, data): Promise<Subject> {
        await this.subjectRepository.update(id, data);
        return this.findOne(id);
    }

}
