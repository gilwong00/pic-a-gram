import { User } from '../../entities';
import {
  Arg,
  Ctx,
  Resolver,
  //Query,
  Mutation,
  InputType,
  Field
} from 'type-graphql';
import { Context } from 'type';
import { compareSync } from 'bcryptjs';

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
    try {
      return await User.create({ ...input }).save();
    } catch (err) {
      throw err;
    }
  }

  @Mutation(() => User)
  async login(
    @Arg('usernameOrEmail') usernameOrEmail: string,
    @Arg('password') password: string,
    @Ctx() { req }: Context
  ): Promise<User> {
    try {
      const query = usernameOrEmail.includes('@')
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } };

      const user = await User.findOne(query);

      if (user) {
        const passwordsMatch = compareSync(password, user.password);

        if (!passwordsMatch) throw new Error('Wrong password');
        req.session.userId = user.id;
        return user;
      } else {
        throw new Error('Could not find a user with the given credentials');
      }
    } catch (err) {
      throw err;
    }
  }
}

export default UserResolver;
