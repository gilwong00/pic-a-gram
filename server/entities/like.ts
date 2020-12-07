import {
  Entity,
  Column,
  ManyToOne,
  BaseEntity,
  PrimaryGeneratedColumn
} from 'typeorm';
import Post from './post';

@Entity('likes')
class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  post_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => Post, post => post.likes)
  post: Post;
}

export default Like;
