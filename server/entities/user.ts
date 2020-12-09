import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  Column,
  OneToMany,
  BeforeInsert,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity
} from 'typeorm';
import { Like, Post } from '.';
import { hash } from 'bcryptjs';

@ObjectType()
@Entity('users')
class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Field()
  @Column({ unique: true })
  username!: string;

  @Index()
  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column()
  password: string;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Post, post => post.user, { nullable: true })
  posts: Array<Post>;

  @OneToMany(() => Like, list => list.user, { nullable: true })
  likes: Array<Like>;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}

export default User;
