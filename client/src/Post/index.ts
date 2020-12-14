export interface ILike {
  id: number;
  user_id: number;
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
}

export { default as Post } from './Post';
