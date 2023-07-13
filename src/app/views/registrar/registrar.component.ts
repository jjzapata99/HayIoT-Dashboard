import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ApiConectionService} from "../../services/api/api-conection.service";

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent {
  position = 'top-end';
  visible = false;
  percentage = 0;
  cText='';
  form!: FormGroup
  tipoEntidad!: string;
  etiquetasDisponibles: string[] = ['temp', 'thermal', 'time','electricity'];
  isChecked :any;
  isCheckedName : any;
  idSensor : any = '';
  equipList : any;
  siteList : any;
  valid = false;
  constructor(private api: ApiConectionService, private formBuilder: FormBuilder) {
    this.fetchEquips()
    this.fetchSites()
  }

/*registrarEntidad(event:Event) {
    if (this.form.valid) {
      console.log(this.form.value)
    } else {
      // Manejar la validación del formulario
      console.log('No es valido')
    }
    console.log(this.tipoEntidad)
    if (this.tipoEntidad == "sitio"){

    }
    else if (this.tipoEntidad == "equipo") {
    }
    else if (this.tipoEntidad == "sensor") {

    }
    event.preventDefault();

  }*/
  changeEntidad(event:Event){
    this.tipoEntidad=(event.target as HTMLSelectElement).value;
    if (this.tipoEntidad == 'sensor'){
      this.valid=false
      this.fetchEquips()
      this.fetchSites()
    }
    else if (this.tipoEntidad =='equipo'){
      this.valid=false
      this.fetchSites()
    }
    else if (this.tipoEntidad =='sitio'){
      this.valid=false

    }
  }/*
  onChange(e : any){
    this.isChecked = !this.isChecked;
    this.isCheckedName = e.target.name;
  }*/

  fetchSites(){
    let query = 'getSites'
    this.api.getQuery(query).subscribe((response: any) => {
      this.siteList=response.data
    });
  }
  fetchEquips(){
    let query = 'getEquips'
    this.api.getQuery(query).subscribe((response: any) => {
      this.equipList=response.data

    });
  }

  sendDataSensor(site : any, equip : any, description : any, type: any){
    if((description.toString()!='') && (site != 'Sitio') && (equip != 'Equipo') && (type != 'Tipo')){
      this.valid= false
      let query = 'pushSensor/'
      this.api.putQuery(query, ({'siteRef':site,'equipRef': equip, 'description':description, 'type':type })).subscribe((response: any) => {
        if(response.id==''){
          this.cText='Ocurrio un Error!'
          this.visible = !this.visible;
        }
        else if(response.exist == 1){
          this.cText='Se agrego el sensor!'
          this.visible = !this.visible;
          this.idSensor = response.id
        }
        else if(response.exist ==0){
          this.cText='El sensor ya existe!'
          this.visible = !this.visible;
          this.idSensor = response.id
        }
      });
    }
    else {
      this.valid= true
      console.log('Validar datos ingresados')
    }
  }
  sendDataEquip(id : any, site : any, equip : any){
    if((id.toString()!='') && (equip.toString()!='') && (site != 'Sitio') ) {
      this.valid= false
      let query = 'pushEquip/'
      this.api.putQuery(query, ({'id': id, 'siteRef': site, 'equip': equip})).subscribe((response: any) => {
        if (response == 1) {
          this.fetchEquips()
          this.cText='Equipo agregado!'
          this.visible = !this.visible;
        }
        else if(response == 0){
          this.cText='El equipo ya Existe!'
          this.visible = !this.visible;
        }
      });
    }else {
      this.valid= true
      console.log('Validar datos ingresados')
    }
  }
  sendDataSite(id: any, desc: any){
    if((id.toString()!='') && (desc.toString()!='') ){
      this.valid= false
      let query = 'pushSite/'
      this.api.putQuery(query, ({'id':id,'site': desc})).subscribe((response: any) => {
        if(response==1) {
          this.fetchSites()
          this.cText='Se agrego el Sitio!'
          this.visible = !this.visible;
        }else if(response == 0) {
          this.cText = 'El sitio ya Existe!'
          this.visible = !this.visible;
        }
      });
    }else {
      this.valid= true
      console.log('Validar datos ingresados')
    }
  }
  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 25;
  }
}
