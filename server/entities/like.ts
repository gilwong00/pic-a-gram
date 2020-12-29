import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column
} from 'typeorm';
import { Post, User } from '.';

@ObjectType()
@Entity('likes')
class Like extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ name: 'post_id' })
  post_id: number;

  @Column({ name: 'user_id' })
  @Field()
  user_id: number;

  @ManyToOne(() => User, user => user.likes, { primary: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Post, post => post.likes, { primary: true })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}

export default Like;
