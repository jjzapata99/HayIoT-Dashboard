import { Component } from '@angular/core';
import {ApiConectionService} from "../../services/api/api-conection.service";

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.scss'],
})
export class EntidadesComponent {
  spinner = false;
  selected_site = {'id':'','site':''}
  selected_equip = {'id':'','siteRef':'','equip':''}
  selected_sensor = {'id':'','siteref':'','equipref':'','type':'', 'description':''}
  data_site = {'data':[this.selected_site], 'indexs':[]}
  data_equip = {'data':[this.selected_equip], 'indexs':[]}
  data_sensor = {'data':[this.selected_sensor], 'indexs':[]}
  constructor(private api: ApiConectionService, ){
    this.api
    //.getQuery('getAllSensors')
      .getQuery('getSensors?id=8&max=200&index=0')
      .subscribe((response: any) => {
        this.data_sensor.data = response.data;
        console.log(this.data_sensor);
      });
      
    this.api
      .getQuery('getEquips')
      .subscribe((response: any) => {
        this.data_equip.data = response;
        console.log(this.data_equip);
      });

    this.api
        .getQuery('getSites')
        .subscribe((response: any) => {
          this.data_site.data = response;
          console.log(this.data_site);
        });
     
    }
  }

