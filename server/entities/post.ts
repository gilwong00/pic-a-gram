import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  Column,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User, Like } from '.';

@ObjectType()
@Entity('posts')
class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column()
  user_id: number;

  @Field()
  @Column()
  username: string;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;

  user: User;

  @OneToMany(() => Like, like => like.post, {
    nullable: true,
    onDelete: 'CASCADE'
  })
  @Field(() => [Like])
  likes: Array<Like>;
}

export default Post;
