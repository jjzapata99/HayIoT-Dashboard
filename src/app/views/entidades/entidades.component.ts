import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import { IconSetService } from '@coreui/icons-angular';
import {cilListNumbered, cilPaperPlane, brandSet, cilSearch, cilCheck, cilX, cilBrush} from '@coreui/icons';
import * as moment from "moment";
import {ApiConectionService} from "../../services/api/api-conection.service";

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.scss'],
})
export class EntidadesComponent {
  spinner = false;
  selected_site = {'id':'','site':''}
  selected_equip = {'id':'','siteref':'','equip':''}
  selected_sensor = {'id':'','siteref':'','equipref':'','type':'', 'description':''}
  data_site = {'data':[this.selected_site], 'indexs':[]}
  data_equip = {'data':[this.selected_equip], 'indexs':[]}
  data_sensor = {'data':[this.selected_sensor], 'indexs':[]}
  constructor(private api: ApiConectionService, ){
    this.fetchSensors(0);
    this.fetchEquips(0);
    this.fetchSites(0);

    }
    fetchSensors(index: any){
      this.api
        .getQuery('getAllSensors?index='.concat(index))
        .subscribe((response: any) => {
          this.data_sensor = response;
        });
    }
    fetchEquips(index:any){
      this.api
        .getQuery('getEquips?index='.concat(index))
        .subscribe((response: any) => {
          this.data_equip = response;
          console.log(this.data_equip);
        });
    }
    fetchSites(index:any){
      this.api
        .getQuery('getSites?index='.concat(index))
        .subscribe((response: any) => {
          this.data_site = response;
          console.log(this.data_site);
        });
    }
  }

