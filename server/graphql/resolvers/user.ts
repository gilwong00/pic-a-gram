import { User } from 'entities';
import {
  Arg,
  //Ctx,
  Resolver,
  //Query,
  Mutation,
  InputType,
  Field,
} from 'type-graphql';

@InputType()
class RegisterUserInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@Resolver(User)
class UserResolver {
  @Mutation(() => User)
  async register(@Arg('input') input: RegisterUserInput) {
    return await User.create({ ...input }).save();
  }
}

export default UserResolver;
