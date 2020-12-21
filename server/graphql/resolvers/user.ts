import { User } from '../../entities';
import {
  Arg,
  Ctx,
  Resolver,
  Query,
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

  @Field()
  avatarColor: string;
}

@Resolver(User)
class UserResolver {
  @Mutation(() => User)
  async register(@Arg('input') input: RegisterUserInput) {
    try {
      return await User.create({
        ...input,
        avatar_color: input.avatarColor
      }).save();
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
      console.log('sdfsdf');
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

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: Context): Promise<User | null | undefined> {
    if (!req.session.userId) return null;
    return await User.findOne(req.session.userId);
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: Context) {
    return new Promise(resolve =>
      req.session.destroy((err: any) => {
        res.clearCookie('user');

        if (err) {
          console.log(err);
          return resolve(false);
        }

        return resolve(true);
      })
    );
  }
}

export default UserResolver;
