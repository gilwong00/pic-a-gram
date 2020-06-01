export { default as PhotoGrid } from './PhotoGrid';
export { default as PhotoItem } from './PhotoItem';
export { default as Photo } from './Photo';

interface IComment {
	_id: number;
	body: string;
	postId: number;
}

export interface IPhoto {
	_id?: number;
	caption: string;
	likes?: number;
	imageUrl?: string;
	comments?: [IComment]
}