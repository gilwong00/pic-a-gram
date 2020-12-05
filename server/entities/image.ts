import { ObjectType, Field } from 'type-graphql';
import { Entity, Column } from 'typeorm';
import { Base } from '.';

@ObjectType()
@Entity()
class Image extends Base {
  @Field()
  @Column()
  image_src: string;
}

export default Image;
