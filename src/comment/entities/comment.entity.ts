import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "../../post/post.entity";
import {User} from "../../user/user.entity";

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(type => Post, post=>post.comments)
    @JoinColumn({name: 'post_id'})
    post_id: Post;

    @ManyToOne(()=>Comment)
    @JoinColumn({name: 'user_id'})
    user: User;
}