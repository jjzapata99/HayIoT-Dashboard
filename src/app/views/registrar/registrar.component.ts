import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ApiConectionService} from "../../services/api/api-conection.service";
import {IconSetService} from "@coreui/icons-angular";
import {brandSet, cilSearch} from "@coreui/icons";

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements  OnInit{
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
  tagList: any []=[];
  filteredOptions: any [] = [new Object({'id':1, 'tag':'asd','selected': false})];
  shoesSet = new Map();

  constructor(private api: ApiConectionService, private formBuilder: FormBuilder) {
    this.fetchEquips()
    this.fetchSites()
  }

  selecCheck(event:any){
    this.tagList[this.tagList.findIndex( i => i.id == event.target.id)]['selected']= true;
  }
  onSearch(searchTerm: string) {
    this.filteredOptions = this.tagList.filter(item => {
      if (item['tag'].toLowerCase().includes(searchTerm)){
        return item;
      }
      }

    );
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
  fetchTags(){
    let query = 'getTags'
    this.api.getQuery(query).subscribe((response: any) => {
      this.tagList= response.map( (x: any) => {
        return new Object({'id':x['id'], 'tag':x['tag'],'selected': false});

      })
      this.filteredOptions=this.tagList
    });
  }

  sendDataSensor(equip : any, description : any){
    let tags : string[] = [];
    for(let i of this.tagList){
      if(i['selected'] == true){
        tags.push(i['id'])
      }
    }
    if((description.toString()!='') && (equip != 'Equipo') && (tags.length > 0) ){
      this.valid= false
      let query = 'pushSensor/'
      this.api.putQuery(query, ({'siteRef':this.equipList[equip]['siteref'],'equipRef': this.equipList[equip]['id'], 'description':description, 'type':'N/a', 'tag':tags})).subscribe((response: any) => {
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
    else if(tags.length==0) {
      this.cText = 'El sensor debe contener al menos un Tag'
      this.visible = !this.visible;
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

  ngOnInit(): void {
    this.fetchTags()
  }
}
