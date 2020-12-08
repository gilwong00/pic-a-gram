import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm';
import { Post, User } from '.';

@ObjectType()
@Entity('likes')
class Like extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  // @ManyToOne(() => Post, post => post.likes)
  @Column({ name: 'post_id' })
  post_id: number;

  @Field()
  // @ManyToOne(() => User, user => user.likes)
  @Column({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => User, user => user.likes)
  user: User;

  @ManyToOne(() => Post, post => post.likes)
  post: Post;
}

export default Like;
