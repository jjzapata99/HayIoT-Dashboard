import { Component, OnInit } from '@angular/core';
import { IconSetService } from '@coreui/icons-angular';
import {ApiConectionService} from "../../services/api/api-conection.service";
import {cilBrush, cilList, cilShieldAlt, cilX, cilXCircle} from '@coreui/icons';

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.scss'],
})
export class EntidadesComponent {
  icons = { cilList, cilShieldAlt, cilBrush, cilX,cilXCircle};
  type = '';
  enableEditS = false;
  enableEditE = false;
  enableEditSr = false;
  validation= false;
  spinner = false;
  selected_site = {'id':'','site':''}
  selected_equip = {'id':'','siteref':'','equip':''}
  selected_sensor = {'id':'','siteref':'','equipref':'','type':'', 'description':''}
  data_site = {'data':[this.selected_site], 'indexs':[]}
  data_equip = {'data':[this.selected_equip], 'indexs':[]}
  data_sensor = {'data':[this.selected_sensor], 'indexs':[]}
  position = 'top-end';
  visible = false;
  percentage = 0;
  cText = '';
  public visiblePop = false;
  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 25;
  }
  popWindow() {
    this.visiblePop = !this.visiblePop;
  }
  editSites(){
    this.popWindow()
    this.type = 's'

  }
  editEquips(){
    this.popWindow()
    this.type = 'e'
  }
  editSensors(){
    this.popWindow()
    this.type = 'sr'

  }
  handleLiveDemoChange(event: any) {
    this.visiblePop = event;
  }

  constructor(private api: ApiConectionService){
    this.fetchSensors(0);
    this.fetchEquips(0);
    this.fetchSites(0);

    }
  deleteS(d :any, i :any) {
    if(confirm('¿Está seguro de que desea eliminar este sitio?')) {
      this.api.deleteQuery('deleteSite?id=' + d.id).subscribe((response: any) => {
        this.cText=response.message
        this.visible= !this.visible
        this.fetchSites(0)
      });
    }
  }
  deleteE(d :any, i :any) {
    if(confirm('¿Está seguro de que desea eliminar este equipo?')) {
      this.api.deleteQuery('deleteEquip?id=' + d.id).subscribe((response: any) => {
        this.cText=response.message
        this.visible= !this.visible
        this.fetchEquips(0)
      });
    }
  }
  deleteSr(d :any, i :any) {
    if(confirm('¿Está seguro de que desea eliminar este sensor?')) {
      this.api.deleteQuery('deleteSensor?id=' + d.id).subscribe((response: any) => {
        this.cText=response.message
        this.visible= !this.visible
        this.fetchSensors(0)
      });
    }
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
        });
    }
    fetchSites(index:any){
      this.api
        .getQuery('getSites?index='.concat(index))
        .subscribe((response: any) => {
          this.data_site = response;
        });
    }
  validate(pass: any){
    if(pass == 'root1234'){
      this.validation = true
      if (this.type == 's') this.enableEditS=true;
      if (this.type == 'e') this.enableEditE=true;
      if (this.type == 'sr') this.enableEditSr=true;
    }
    this.popWindow()
  }
  }

