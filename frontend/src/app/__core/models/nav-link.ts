export interface SideBarLink {
	name: string;
	icon: string;
	url: string;
	isActive: boolean;
	isOver: boolean;
	roles: string[];
	children: SideBarLink[];
}
