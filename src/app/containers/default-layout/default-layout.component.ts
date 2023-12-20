import { Component } from '@angular/core';

import { navItems } from './_nav';
import {ApiConectionService} from "../../services/api/api-conection.service";
import {DashboardChartsData} from "../../views/dashboard/dashboard-charts-data";
import {IconSetService} from "@coreui/icons-angular";
import {
  brandSet,
  cilBrush,
  cilCheck,
  cilFile,
  cilListNumbered,
  cilMenu,
  cilPaperPlane, cilPencil,
  cilSearch, cilSpeedometer,
  cilStar,
  cilX,
  cilRouter,
  cilRss
} from "@coreui/icons";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {
  constructor(public iconSet: IconSetService) {
    iconSet.icons = { cilListNumbered,cilPaperPlane, cilCheck, cilBrush, cilX ,cilSearch, cilStar,cilFile, cilMenu, cilPencil, cilSpeedometer,  cilRouter, cilRss,...brandSet };

  }
  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

}
