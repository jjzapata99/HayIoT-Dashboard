import {Component, OnInit} from '@angular/core';
import {ApiConectionService} from "../../services/api/api-conection.service";
import {IconSetService} from "@coreui/icons-angular";
import {brandSet, cilBrush, cilCheck, cilListNumbered, cilPaperPlane, cilSearch, cilStar, cilX,cilFile, cilMenu, cilPencil, cilSpeedometer} from "@coreui/icons";
import {DashboardChartsData} from "../dashboard/dashboard-charts-data";
import { ChartjsModule } from '@coreui/angular-chartjs';

@Component({
  selector: 'app-lst',
  templateUrl: './lst.component.html',
  styleUrls: ['./lst.component.scss']
})

export class LstComponent implements  OnInit{
  option: any
  constructor(private api: ApiConectionService, private chartsData: DashboardChartsData, public iconSet: IconSetService) {
    this.option = chartsData.mainChart.options
    iconSet.icons = { cilListNumbered,cilPaperPlane, cilCheck, cilBrush, cilX ,cilSearch, cilStar,cilFile, cilMenu, cilPencil, cilSpeedometer, ...brandSet };

  }

  sensorData: any = {datasets: [{'data':[]}], labels: []};


  ngOnInit(): void {
  }

}
