import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgDefinitionsComponent } from './svg-definitions/svg-definitions.component';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { ReactiveFormsModule } from '@angular/forms';

const WakControlComponents = [
  SvgDefinitionsComponent,
  SvgIconComponent
]

@NgModule({
  declarations: [WakControlComponents],
  exports: WakControlComponents,
  imports: [CommonModule, ReactiveFormsModule]
})
export class WakControlModule { }
