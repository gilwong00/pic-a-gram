import { IUser } from 'Context';
export interface ILike {
  id: number;
  user_id: number;
  post_id: number;
}
export interface IComment {
  id: number;
  user_id: number;
  comment: string;
  user?: IUser;
}

export interface IImage {
  image_src: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  user_id: number;
  username: string;
  created_at: Date;
  likes: Array<ILike>;
  image?: IImage;
  comments: Array<IComment>;
}

export interface IPaginatedPosts {
  posts: Array<IPost>;
  totalPage: number;
}

export { default as Post } from './Post';
export { default as AddPost } from './AddPost';
export { default as LikeButton } from './LikeButton';
export { default as CommentButton } from './CommentButton';
export { default as PostDetails } from './PostDetails';
