import { ObjectType, Field } from 'type-graphql';
import { Entity, Column, OneToMany, BeforeInsert, Index } from 'typeorm';
import { Post, Base } from '.';
import { hash } from 'bcryptjs';

@ObjectType()
@Entity()
class User extends Base {
  @Field()
  @Index()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Index()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Post, post => post.user)
  posts: Array<Post>;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}

export default User;
