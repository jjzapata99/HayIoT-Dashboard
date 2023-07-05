import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistrarComponent } from './registrar/registrar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CardModule, NavModule, TabsModule, GridModule, ProgressModule, ButtonModule, FormModule, ButtonGroupModule, AvatarModule, TableModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { IconModule } from '@coreui/icons-angular';
import { WidgetsModule } from '../widgets/widgets.module';
import {CoreUIFormsModule} from "../forms/forms.module";


@NgModule({
  declarations: [
    RegistrarComponent
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    WidgetsModule,
    CoreUIFormsModule,
    FormsModule
  ]
})
export class RegistroModule { }
