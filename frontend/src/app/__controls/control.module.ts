import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiScrollbarModule } from '@taiga-ui/core';
import { SvgDefinitionsComponent } from './svg-definitions/svg-definitions.component';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { NavItemComponent } from './sidebar/nav-item/nav-item.component';
import { ResizerComponent } from './sidebar/resizer/resizer.component';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { CodeSelectComponent } from './code-select/code-select.component';
import { NzSelectModule } from 'ng-zorro-antd/select';

const CONTROL_COMPONENTS = [
	SidebarComponent,
	NavItemComponent,
	ResizerComponent,
	SvgDefinitionsComponent,
	SvgIconComponent,
	InputComponent,
	ButtonComponent,
	CodeSelectComponent
];
@NgModule({
	declarations: CONTROL_COMPONENTS,
	exports: CONTROL_COMPONENTS,
	imports: [CommonModule, ReactiveFormsModule, RouterModule, TuiScrollbarModule, FormsModule, NzSelectModule],
})
export class ControlModule { }
