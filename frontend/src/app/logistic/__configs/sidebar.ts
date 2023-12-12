import { SideBarLink } from 'src/app/__models/ui-models/nav-link';

export const SIDEBAR_LINKS: SideBarLink[] = [
	{
		name: 'Lệnh điều vận',
		icon: 'issues',
		url: '/logistic/transaction',
		isActive: false,
		isOver: false,
		roles: [],
		children: [
			{
				name: 'Danh sách',
				icon: 'list-outdent',
				url: '/logistic/transaction/list',
				isActive: false,
				isOver: false,
				roles: [],
				children: [],
			},
			{
				name: 'Tạo mới',
				icon: '',
				url: '/logistic/transaction/new',
				isActive: false,
				isOver: false,
				roles: [],
				children: [],
			},
		],
	},
	{
		name: 'Danh mục lái xe',
		icon: 'user',
		url: '/logistic/driver',
		isActive: false,
		isOver: false,
		roles: [],
		children: [],
	},
	{
		name: 'Danh mục phương tiện',
		icon: 'car',
		url: '/admin/employees',
		isActive: false,
		isOver: false,
		roles: [],
		children: [],
	},
	{
		name: 'Khách hàng',
		icon: 'users',
		url: '/logistic/customer',
		isActive: false,
		isOver: false,
		roles: [],
		children: [],
	},
];
