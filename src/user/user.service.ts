import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
    }

    //povezava na repositorij od baze
    async all(): Promise<User[]> {
        return  this.userRepository.find();
    }

    //pošlje podatke o novo ustvarjenem userju
    create(data): Promise<User> {
        return this.userRepository.save(data);
    }

    //vrača userja
    findOne(condition): Promise<User> {
        return this.userRepository.findOne(condition);
    }

    //posodobitev podatkov
    //await-dokler se to ne izvrši, ne iti na naslednji ukaz
    async update(id, data): Promise<User> {
        await this.userRepository.update(id, data);
        return this.findOne({id});
    }

    //id je tipa number
    delete(id: number): Promise<any> {
        return this.userRepository.delete(id);
    }

}
