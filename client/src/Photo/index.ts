export { default as PhotoGrid } from './PhotoGrid';
export { default as Photo } from './Photo';

interface IComment {
	_id: number;
	body: string;
	postId: number;
}

export interface IPhoto {
	_id: number;
	name: string;
	caption: string;
	likes: number;
	imageUrl?: string;
	comments?: [IComment]
}