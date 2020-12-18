import { ApolloCache, useMutation } from '@apollo/client';
import { LIKE_POST, UNLIKE_POST } from 'graphql/post/mutations';
import { ILike } from 'Post';
import {
  IconButton,
  makeStyles,
  createStyles,
  Typography
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { red } from '@material-ui/core/colors';
import { POST_LIKES_FRAGMENT } from 'graphql/fragments/post';

const useStyles = makeStyles(() =>
  createStyles({
    favoriteIcon: {
      color: red[500]
    }
  })
);

interface IProps {
  likes?: Array<ILike>;
  userId: number | undefined;
  postId: number;
}

const LikeButton: React.FC<IProps> = ({ likes, userId, postId }) => {
  const classes = useStyles();
  const totalLikes = likes?.length ?? 0;
  const isLikedByUser = (likes ?? []).find(
    (like: ILike) => like.post_id === postId && like.user_id === userId
  );

  const updateLikeCount = (
    cache: ApolloCache<any>,
    data: { like?: ILike; unlike?: boolean },
    likedPost: ILike | null = null
  ) => {
    const id = `Post:${postId}`;
    const post = cache.readFragment<{
      id: number;
      likes: Array<{ id: number }>;
    }>({
      id,
      fragment: POST_LIKES_FRAGMENT
    });

    if (post) {
      const likes = !likedPost
        ? [...post.likes, { __typename: 'Like', id: data?.like?.id }]
        : [...post.likes.filter(like => like.id !== likedPost?.id)];

      cache.writeFragment({
        id,
        fragment: POST_LIKES_FRAGMENT,
        data: {
          __typename: 'Post',
          likes
        }
      });
    }
  };

  const [like] = useMutation(LIKE_POST, {
    update(cache: ApolloCache<any>, { data }) {
      return updateLikeCount(cache, data);
    }
  });

  const [unlike] = useMutation(UNLIKE_POST, {
    update(cache: ApolloCache<any>, { data }) {
      return updateLikeCount(cache, data, isLikedByUser);
    }
  });

  const handleClick = async () => {
    const variables = { postId, userId };

    if (isLikedByUser) {
      return await unlike({ variables });
    } else {
      return await like({ variables });
    }
  };

  return (
    <>
      <IconButton
        aria-label='like post'
        className={classes.favoriteIcon}
        onClick={handleClick}
      >
        {isLikedByUser ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      {totalLikes > 0 && <Typography component='p'>{totalLikes}</Typography>}
    </>
  );
};

export default LikeButton;
