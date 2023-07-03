import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { cilList, cilShieldAlt } from '@coreui/icons';

import {
    AvatarModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule, DropdownModule,
    FormModule,
    GridModule,
    NavModule, PageItemDirective, PageLinkDirective, PaginationComponent,
    ProgressModule, SpinnerComponent,
    TableModule,
    TabsModule, ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent
} from '@coreui/angular';
import {IconModule, IconSetService} from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { WidgetsModule } from '../widgets/widgets.module';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {Chartsd3Module} from "../chartsd3/chartsd3.module";

@NgModule({
  imports: [
    DashboardRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    IconModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    WidgetsModule,
    DropdownModule,
    PaginationComponent,
    PageItemDirective,
    PageLinkDirective,
    MatDatepickerModule,
    MatFormFieldModule,
    ClipboardModule,
    ToasterComponent,
    ToastComponent,
    ToastHeaderComponent,
    ToastBodyComponent,
    SpinnerComponent,
    Chartsd3Module,
  ],
  declarations: [DashboardComponent],
  providers: [
    IconSetService]
})
export class DashboardModule {
  icons = { cilList, cilShieldAlt };
}
