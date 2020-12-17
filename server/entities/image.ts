import { Post } from '.';
import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToOne,
  JoinColumn
} from 'typeorm';

@ObjectType()
@Entity('images')
class Image extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  image_src: string;

  @Column()
  post_id: number;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Post, post => post.image, {
    primary: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}

export default Image;
