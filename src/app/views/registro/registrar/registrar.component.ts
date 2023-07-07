import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ApiConectionService} from "../../../services/api/api-conection.service";

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent {
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
      this.siteList=response
    });
  }
  fetchEquips(){
    let query = 'getEquips'
    this.api.getQuery(query).subscribe((response: any) => {
      this.equipList=response

    });
  }

  sendDataSensor(site : any, equip : any, description : any, type: any){
    if((description.toString()!='') && (site != 'Sitio') && (equip != 'Equipo') && (type != 'Tipo')){
      this.valid= false
      let query = 'pushSensor/'
      this.api.putQuery(query, ({'siteRef':site,'equipRef': equip, 'description':description, 'type':type })).subscribe((response: any) => {
        this.idSensor = response
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
        }
        else if(response == 0){
          console.log('erorrsfas')
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
        }
      });
    }else {
      this.valid= true
      console.log('Validar datos ingresados')
    }
  }
}
