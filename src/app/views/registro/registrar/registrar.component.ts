import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ApiConectionService} from "../../../services/api-conection.service";

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
  constructor(private api: ApiConectionService, private formBuilder: FormBuilder) {

  }

  registrarEntidad(event:Event) {
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

  }
  changeEntidad(event:Event){
    this.tipoEntidad=(event.target as HTMLSelectElement).value;
    if (this.tipoEntidad == 'sensor'){
      this.form = this.formBuilder.group({
        sitio: ['', Validators.required],
        equipo: ['', Validators.required],
        identificador: ['', Validators.required],
        descripcion: ['', [Validators.required]],
        unidad: ['', Validators.required],
        etiqueta: ['', Validators.required],

      });
    }
    else if (this.tipoEntidad =='equipo'){
      this.form = this.formBuilder.group({
        sitio: ['', Validators.required],
        identificador: ['', [Validators.required]],
        equipo: ['', Validators.required],
      });
    }
    else if (this.tipoEntidad =='sitio'){
      this.form = this.formBuilder.group({
        identificador: ['', Validators.required],
        area: ['', [Validators.required]],
      });
    }
  }
  onChange(e : any){
    this.isChecked = !this.isChecked;
    this.isCheckedName = e.target.name;
  }
  sendDataSensor(site : any, equip : any, description : any, type: any){
    let query = 'pushSensor/'
    this.api.putQuery(query, ({'siteRef':site,'equipRef': equip, 'description':description, 'type':type })).subscribe((response: any) => {
    this.idSensor = response
      console.log(response)
  });
  }
  sendDataEquip(id : any, site : any, equip : any){
    let query = 'pushEquip/'
    this.api.putQuery(query, ({'id':id,'siteRef': site, 'equip':equip})).subscribe((response: any) => {
      console.log(response)
    });
  }
}
