import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import { IconSetService } from '@coreui/icons-angular';
import {cilListNumbered, cilPaperPlane, brandSet, cilSearch, cilCheck, cilX, cilBrush} from '@coreui/icons';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import {ApiConectionService} from "../../services/api/api-conection.service";
import * as moment from "moment";
/*interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}*/

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  hostURL = "http://200.126.14.233:8000/"
  position = 'top-end';
  visible = false;
  percentage = 0;
  typeDate = 'UTC';
  enableEdit = false;
  etiquetasDisponibles: string[] = ['temp', 'thermal', 'time','electricity'];
  enableEditIndex = null;
  editedData : any ;
  click = false;
  equipList : any;
  spinner =false;
  csvData: any;
  siteList : any;
  editable = true;
  cText = '';
  validator = {'id':'','siteref':'','equipref':'','type':'','description':'','lastSensed':''}
  sensorData: any = {datasets: [], labels: []};
  constructor(private api: ApiConectionService, private chartsData: DashboardChartsData, public iconSet: IconSetService) {
    iconSet.icons = { cilListNumbered,cilPaperPlane, cilCheck, cilBrush, cilX ,cilSearch, ...brandSet };
    this.fetchSites()
    this.fetchEquips()
  }
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  queryExample = ''
  lastDate: any= ''
  selected = {'id':'','siteref':'','equipref':'','type':'','description':'','lastSensed':''}
  data = {'data':[this.selected], 'indexs':[]}
  /*public users: IUser[] = [
    {
      name: 'Yiorgos Avraamu',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Us',
      usage: 50,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Mastercard',
      activity: '10 sec ago',
      avatar: './assets/img/avatars/1.jpg',
      status: 'success',
      color: 'success'
    },
    {
      name: 'Avram Tarasios',
      state: 'Recurring ',
      registered: 'Jan 1, 2021',
      country: 'Br',
      usage: 10,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Visa',
      activity: '5 minutes ago',
      avatar: './assets/img/avatars/2.jpg',
      status: 'danger',
      color: 'info'
    },
    {
      name: 'Quintin Ed',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'In',
      usage: 74,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Stripe',
      activity: '1 hour ago',
      avatar: './assets/img/avatars/3.jpg',
      status: 'warning',
      color: 'warning'
    },
    {
      name: 'Enéas Kwadwo',
      state: 'Sleep',
      registered: 'Jan 1, 2021',
      country: 'Fr',
      usage: 98,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Paypal',
      activity: 'Last month',
      avatar: './assets/img/avatars/4.jpg',
      status: 'secondary',
      color: 'danger'
    },
    {
      name: 'Agapetus Tadeáš',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Es',
      usage: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'ApplePay',
      activity: 'Last week',
      avatar: './assets/img/avatars/5.jpg',
      status: 'success',
      color: 'primary'
    },
    {
      name: 'Friderik Dávid',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Pl',
      usage: 43,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Amex',
      activity: 'Yesterday',
      avatar: './assets/img/avatars/6.jpg',
      status: 'info',
      color: 'dark'
    }
  ];*/
  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });


  toggleToast() {
    this.cText='Valor Copiado!'
    this.visible = !this.visible;
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 25;
  }

  ngOnInit(): void {
    this.initCharts();
  }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }
  fetchSensors(val: any, option: any, index: any){
    let query
    if (option == 'ID') query = 'getSensors?id='.concat(val+'&max=10&index='.concat(index))
    else query = 'getSensors?name='.concat(val+'&max=10&index='.concat(index))
    this.api.getQuery(query).subscribe((response: any) => {
      if(response['data'].length>0){
        this.data= response
        this.sensorData = {datasets:[{data:[0],label:''}], labels:['']}
      }
      else {
        this.selected = {'id':'','siteref':'','equipref':'','type':'','description':'','lastSensed':''}
        this.data = {'data': [this.selected], 'indexs': []}
      }
    });
  }

  getDates(){
    let init = moment(this.range.value.start)
    let end = moment(this.range.value.end)
    if (init.isValid() && end.isValid()){
      return init.format("DD/MM/YYYY") + ' - ' + end.format("DD/MM/YYYY");
    }
    return " "

  }
  fetchData(){
    let init =''
    let end = ''
    if(this.typeDate == 'UTC'){
      init = moment(this.range.value.start).format("DD/MM/YYYY")
      end = moment(this.range.value.end).format("DD/MM/YYYY")
    }else{
      init = moment(this.range.value.start).format("DD/MM/YYYY") + ' 05:00:00'
      end = moment(this.range.value.end).add(1,'days').format("DD/MM/YYYY") + ' 05:00:00'
    }
    let query = 'getData?id='.concat(this.selected.id+'&start='.concat(init+'&end='.concat(end)))
    this.spinner= true
    this.api.getQuery(query).subscribe((response: any) => {
      this.csvData = response
      let temp : any[] = []
      let temp2 : any[] = []
      let temp3 : any[] = []
      let temp4 : any
      let temp5: any[] = []
      let time = ''
      for (let i of this.csvData){
        time = new Date(i.sensedAt + 'Z').toLocaleString()
        if(!temp.includes(i.type)){
          temp.push(i.type)
        }
        if(!temp2.includes(time)){
          temp2.push(time)
        }
      }
      for(let i of temp){
        temp3 = []
        temp4 = response[0].sensedAt
        for(let x of this.csvData){
          if(i == x.type){
            temp3.push(x.data)
          }
        }
        let color = this.getRandomColor()
        temp5.push({data: temp3, label: i, borderColor:color,
          backgroundColor : color,
          pointBackgroundColor: color,
          display: false,
          pointBorderColort: color})
      }
      this.sensorData = {datasets: temp5, labels:temp2}
      this.click = false
      this.spinner=false
    });
    this.queryExample = 'getData?id='.concat(this.selected.id+
      '&start='.concat(moment(this.range.value.start).format("DD/MM/YYYY")+
        '&end='.concat(moment(this.range.value.end).format("DD/MM/YYYY"))))
  }
  selectItem(item:any){
    this.api.getQuery("getLastSensed?id=".concat(item.id)).subscribe((response: any) => {
      if(response['lastSensed']!= 'Nan') {
        this.lastDate = new Date(response['lastSensed'] + 'Z').toLocaleString()
        this.click=false
      }
      else {
        this.lastDate = 'Not Sensed';
        this.click = true
      }
    });
    this.selected=item
  }
  download(){
    this.downloadFile(this.csvData, 'hayIot');
  }

  downloadFile(data: any, filename='data') {
    let csvData = this.convertToCSV(data, ['id_sensor', 'data', 'type', 'sensedAt']);
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  convertToCSV(objArray:any, headerList:any) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';

    for (let index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i+1)+'';
      for (let index in headerList) {
        let head = headerList[index];

        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }
    return str;
  }
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

  enableEditMethod( e :any, i:any) {
    this.enableEdit = true;
    this.editable= true;
    this.validator = e;
    this.enableEditIndex = i;
    this.editedData= {'site':e.siteref, 'equip':e.equipref, 'type':e.type}
  }
  cancelEdit(){
    this.enableEdit=false;
    this.editable = false;

  }
  sendEdit(id: any,desc: any, i :any){
    let item = {'id': id, "siteRef": this.editedData.site, "equipRef": this.editedData.equip,
      "description": desc, "type": this.editedData.type}
    this.api.putQuery("editDataSensor/", item).subscribe((response: any) => {
      if(response == 1){
        this.cText='Sensor editado Exitosamente';
        this.visible = !this.visible;
      }
      else {
        this.cText='Ocurrio un fallo'
        this.visible = !this.visible;
      }
    });
    this.data['data'][i]={'id':id,'siteref':this.editedData.site,'equipref':this.editedData.equip,
      'type':this.editedData.type,'description':desc,'lastSensed':''}
    this.enableEdit=false;
    this.editable = false;

  }

  getRandomColor(){
    const minHue = 0;
    const maxHue = 360;
    const minSaturation = 20;
    const maxSaturation = 50;
    const minLightness = 40;
    const maxLightness = 60;
    const hue = Math.floor(Math.random() * (maxHue - minHue + 1)) + minHue;
    const saturation = Math.floor(Math.random() * (maxSaturation - minSaturation + 1)) + minSaturation;
    const lightness = Math.floor(Math.random() * (maxLightness - minLightness + 1)) + minLightness;
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    return color;
  }

}
