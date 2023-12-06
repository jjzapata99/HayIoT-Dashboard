import { NgModule } from '@angular/core';
import {HashLocationStrategy, JsonPipe, LocationStrategy, NgIf, PathLocationStrategy} from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { NgScrollbarModule } from 'ngx-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import { DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent } from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent,
  NavModule, PageItemDirective, PageLinkDirective, PaginationComponent,
  ProgressModule,
  SharedModule,
  SidebarModule,
  SpinnerComponent,
  TabsModule, ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent, TooltipModule,
  UtilitiesModule
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import {HttpClientModule} from "@angular/common/http";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ClipboardModule} from "@angular/cdk/clipboard";
import { RegistrarComponent } from './views/registrar/registrar.component';
import { EntidadesComponent } from './views/entidades/entidades.component';
import {cilBrush, cilCheck, cilList, cilShieldAlt, cilX} from "@coreui/icons";
import { SearchComponent } from './views/search/search.component';
import { LstComponent } from './views/lst/lst.component';

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent
];

@NgModule({
  declarations: [AppComponent, RegistrarComponent, EntidadesComponent, ...APP_CONTAINERS, SearchComponent, LstComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    NgScrollbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    JsonPipe,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ClipboardModule,
    ToasterComponent,
    ToastComponent,
    ToastHeaderComponent,
    ToastBodyComponent,
    SpinnerComponent,
    PaginationComponent,
    PageItemDirective,
    PageLinkDirective,
    ModalComponent,
    ModalFooterComponent,
    ModalBodyComponent,
    ModalHeaderComponent,
    TooltipModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    IconSetService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  icons = { cilList, cilShieldAlt, cilCheck, cilX, cilBrush};
}
