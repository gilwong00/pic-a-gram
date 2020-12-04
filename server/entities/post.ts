
import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  BaseEntity,
  OneToOne,
} from 'typeorm';
import { User, Image } from '.';

@ObjectType()
@Entity()
class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  text: string;

  @Field()
  @Column()
  user_id: number;

  user: User;

  @OneToOne(() => Image, image => image.id)
  @JoinColumn()
  photo_id: string

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}

export default Post;