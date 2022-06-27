import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "../user/user.entity";
import {JoinColumn} from "typeorm";
import {Subject} from "../subject/subject.entity";



@Entity('posts')
 export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(()=>User, (user) => user.posts, {eager:true})
    //spodaj je objekt userja, preko typeorm dobimo vse podatke o userju
    @JoinColumn({name: 'user_id'})
    user: User;

   @ManyToOne(()=>Subject, (subject) => subject.posts, {eager:true})
   //spodaj je objekt userja, preko typeorm dobimo vse podatke o userju
   @JoinColumn({name: 'subject_id'})
   subject: Subject;
 }