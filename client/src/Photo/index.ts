export { default as PhotoGrid } from './PhotoGrid';
export { default as PhotoItem } from './PhotoItem';
export { default as AddEditPhoto } from './AddEditPhoto';
export { default as Photo } from './Photo';

export interface IComment {
	_id: number;
	body: string;
	author: string;
	postId: number;
}

export interface IPhoto {
	_id?: number;
	caption: string;
	likes?: number;
	imageUrl?: string;
	comments?: [IComment]
}