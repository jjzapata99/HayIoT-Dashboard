import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarComponent } from './bar/bar.component';



@NgModule({
  declarations: [
    BarComponent
  ],
  exports: [
    BarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class Chartsd3Module { }
