import { ObjectType, Field } from 'type-graphql';
import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';
import { User, Image, Base } from '.';

@ObjectType()
@Entity()
class Post extends Base {
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
  photo_id: string;
}

export default Post;
