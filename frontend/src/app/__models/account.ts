import { Group } from './group';
import { User } from './user';

export interface Account {
	user: User;
	token: string;
	roles: string[];
}
