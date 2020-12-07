import {
  Entity,
  ManyToOne,
  BaseEntity,
  PrimaryGeneratedColumn,
  JoinColumn
} from 'typeorm';
import { Post, User } from '.';

@Entity('likes')
class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Post, post => post.likes)
  @JoinColumn({ name: 'post_id' })
  post_id: number;

  @ManyToOne(() => User, user => user.likes)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  // @ManyToOne(() => User, user => user.likes)
  // user: User;

  // @ManyToOne(() => Post, post => post.likes)
  // post: Post;
}

export default Like;
