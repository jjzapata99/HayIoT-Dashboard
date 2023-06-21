import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import { IconSetService } from '@coreui/icons-angular';
import { cilListNumbered, cilPaperPlane, brandSet, cilSearch } from '@coreui/icons';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import {ApiConectionService} from "../../services/api-conection.service";
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
  constructor(private api: ApiConectionService, private chartsData: DashboardChartsData, public iconSet: IconSetService) {
    iconSet.icons = { cilListNumbered, cilPaperPlane, cilSearch, ...brandSet };
  }
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  queryExample = ''
  selected = {'id':'','siteref':'','equipref':'','type':'','description':''}
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

  ngOnInit(): void {
    this.initCharts();
  }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }
  fetchSensors(val: any, option: any, index: any){
    let query
    if (option == 'ID') query = 'getSensors?id='.concat(val+'&max=10&index=0')
    else query = 'getSensors?name='.concat(val+'&max=10&index='.concat(index))
    this.api.getQuery(query).subscribe((response: any) => {
      console.log(response)
      this.data= response
    });
  }
  fetchData(){
    let init = moment(this.range.value.start).format("DD/MM/YYYY")
    let end = moment(this.range.value.end).format("DD/MM/YYYY")
    let query = 'getData?id='.concat(this.selected.id+'&start='.concat(init+'&end='.concat(end)))
    this.api.getQuery(query).subscribe((response: any) => {
      console.log(response)
    });
    this.queryExample = query
  }
  selectItem(item:any){
    this.selected=item
  }
  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }
}
