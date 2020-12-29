import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  Column,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne
} from 'typeorm';
import { User, Like, Image, Comment } from '.';

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

  @OneToOne(() => Image, image => image.post, {
    onDelete: 'CASCADE',
    nullable: true
  })
  @Field(() => Image)
  image: Image;

  @OneToMany(() => Like, like => like.post, {
    nullable: true,
    onDelete: 'CASCADE'
  })
  @Field(() => [Like])
  likes: Array<Like>;

  @OneToMany(() => Comment, comment => comment.post, {
    nullable: true,
    onDelete: 'CASCADE'
  })
  @Field(() => [Comment])
  comments: Array<Comment>;
}

export default Post;
