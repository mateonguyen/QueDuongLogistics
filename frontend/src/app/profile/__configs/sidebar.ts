import { SideBarLink } from 'src/app/__models/ui-models/nav-link';

export const SIDEBAR_LINKS: SideBarLink[] = [
	{
		name: 'Tài khoản',
		icon: 'account',
		url: '/profile/account',
		isActive: false,
		isOver: false,
		roles: [],
		children: [],
	},
	{
		name: 'Mật khẩu',
		icon: 'lock',
		url: '/profile/password',
		isActive: false,
		isOver: false,
		roles: [],
		children: [],
	},
	{
		name: 'Cài đặt',
		icon: 'preferences',
		url: '/profile/preferences',
		isActive: false,
		isOver: false,
		roles: [],
		children: [],
	},
];
