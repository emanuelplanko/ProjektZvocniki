import {Post} from "../../post/post.entity";

export class CreateCommentDto {
    text: string
    post_id: Post
    parent_comment_id: Comment
}
