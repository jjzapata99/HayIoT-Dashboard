import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {cilBrush, cilCheck, cilList, cilRouter, cilRss, cilShieldAlt, cilX} from '@coreui/icons';

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule, DropdownModule,
  FormModule,
  GridModule, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent,
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

@NgModule({
  imports: [
    DashboardRoutingModule,
    CardModule,
    NavModule,
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
    FormsModule,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent
  ],
  declarations: [DashboardComponent],
  providers: [
    IconSetService]
})
export class DashboardModule {
  icons = { cilList, cilShieldAlt, cilCheck, cilX, cilBrush, cilRouter, cilRss};
}
