import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User, Image, Like } from '.';

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
  text: string;

  @Field()
  @Column()
  user_id: number;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;

  user: User;

  @OneToOne(() => Image, image => image.id)
  @JoinColumn({ name: 'photo_id' })
  photo_id: number;

  @OneToMany(() => Like, like => like.post_id)
  likes: Array<Like>;
}

export default Post;
