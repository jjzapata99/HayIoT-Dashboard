import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiConectionService} from "../../services/api/api-conection.service";
import {IconSetService} from "@coreui/icons-angular";
import {brandSet, cilBrush, cilCheck, cilListNumbered, cilPaperPlane, cilSearch, cilStar, cilX,cilFile, cilMenu, cilPencil, cilSpeedometer} from "@coreui/icons";
import {DashboardChartsData} from "../dashboard/dashboard-charts-data";
import {EChartsOption} from "echarts";
import * as moment from "moment/moment";
import {interval, Subject, takeUntil} from "rxjs";
import {Chart} from "chart.js";


@Component({
  selector: 'app-lst',
  templateUrl: './lst.component.html',
  styleUrls: ['./lst.component.scss']
})

export class LstComponent implements  OnInit, OnDestroy {
  chart: any;
  option: any

  constructor(private api: ApiConectionService, private chartsData: DashboardChartsData, public iconSet: IconSetService) {
    this.option = chartsData.mainChart
    this.option.options = {
      responsive: false,
      stacked: false,
      maintainAspectRatio: true,
      scales: {

        x: {
          grid: {
            drawOnChartArea: false
          }
        },
        y: {
          type: 'linear',
          stacked: false,

        }
      },
      elements: {
        line: {
          tension: 0.1
        },
        point: {
          radius: 0,
          hitRadius: 1,
          hoverRadius: 1,
          hoverBorderWidth: 1
        }
      }
    };
    this.option.options.animation = false;
    iconSet.icons = {
      cilListNumbered,
      cilPaperPlane,
      cilCheck,
      cilBrush,
      cilX,
      cilSearch,
      cilStar,
      cilFile,
      cilMenu,
      cilPencil,
      cilSpeedometer, ...brandSet
    };
    for (let i of this.s31s) {
      this.fetchDataS31(i)
    }
    for (let i of this.elec) {
      this.fetchDataElec(i)
    }
  }

  private destroy$ = new Subject<void>();
  temperature = 0
  humidity = 0
  velocity = 0
  s1: any = null;
  s2: any = null;
  s3: any = null;
  s4: any = null;
  s5: any = null;
  s6: any = null;
  s7: any = null;
  s8: any = null;
  s9: any = null;
  s10: any = null;
  acu: any = null;
  she: any = null;
  s31l = [this.s2, this.s3, this.s6, this.s7, this.s8, this.s9, this.s10]
  s31s = [/*'648ca98972114d2f0457ebbf',*/'648ca97e72114d2f0457ebaf', '648ca81672114d2f0457eb89', /*'648ca97f72114d2f0457ebb7', '648ca96a72114d2f0457eba0',*/ '64b5cb98cca9b534b74527c0',
    '64b5cbfecca9b534b74528ed', '64b5cc16cca9b534b7452948', '64b5cc2dcca9b534b7452985', '64b5cc45cca9b534b74529c2']
  elec = ['64ac62fcdc5442c4e078bb14', '64ad81a0dc5442c4e0796382']

  ngOnInit(): void {
    this.fetchLastDataTemp()
    this.repeat();
  }

  optionsSpeed: EChartsOption = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        min: 0,
        max: 2,
        detail: {
          formatter: '{value}'
        },
        data: [
          {
            value: this.velocity,
            name: 'm/sec'
          }
        ]
      }
    ]
  };

  optionsTemp: EChartsOption = {
    series: [
      {
        type: 'gauge',
        center: ['50%', '60%'],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 60,
        splitNumber: 12,
        itemStyle: {
          color: '#FFAB91'
        },
        progress: {
          show: true,
          width: 30
        },

        pointer: {
          show: false
        },
        axisLine: {
          lineStyle: {
            width: 30
          }
        },
        axisTick: {
          distance: -45,
          splitNumber: 5,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        splitLine: {
          distance: -52,
          length: 14,
          lineStyle: {
            width: 3,
            color: '#999'
          }
        },
        axisLabel: {
          distance: -10,
          color: '#999',
          fontSize: 14
        },
        anchor: {
          show: false
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          width: '60%',
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, '-15%'],
          fontSize: 30,
          fontWeight: 'bolder',
          formatter: '{value} °C',
          color: 'inherit'
        },
        data: [
          {
            value: this.temperature
          }
        ]
      },
    ]
  }

  optionsHum: EChartsOption = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 240,
        splitNumber: 12,
        itemStyle: {
          color: '#58D9F9',
          shadowColor: 'rgba(0,138,255,0.45)',
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2
        },
        progress: {
          show: true,
          roundCap: true,
          width: 18
        },
        pointer: {
          icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
          length: '75%',
          width: 16,
          offsetCenter: [0, '5%']
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 18
          }
        },
        axisTick: {
          splitNumber: 2,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        splitLine: {
          length: 12,
          lineStyle: {
            width: 3,
            color: '#999'
          }
        },
        axisLabel: {
          distance: 20,
          color: '#999',
          fontSize: 10
        },
        title: {
          show: false
        },
        detail: {
          backgroundColor: '#fff',
          borderColor: '#999',
          borderWidth: 2,
          width: '60%',
          lineHeight: 40,
          height: 40,
          borderRadius: 8,
          offsetCenter: [0, '35%'],
          valueAnimation: true,
          formatter: function (value) {
            return '{value|' + value.toFixed(1) + '}{unit|%RH}';
          },
          rich: {
            value: {
              fontSize: 24,
              fontWeight: 'bolder',
              color: '#777'
            },
            unit: {
              fontSize: 10,
              color: '#999',
              padding: [0, 0, -5, 10]
            }
          }
        },
        data: [
          {
            value: this.humidity
          }
        ]
      }
    ]
  };

  fetchDataS31(id: any) {
    let init = ''
    let end = ''
    let tags: string[] = ['Power'];
    init = moment(new Date(new Date().getTime() + 3600 * 5000)).format("DD/MM/YYYY HH:MM:SS")
    end = moment(new Date()).add(1, 'days').format("DD/MM/YYYY") + ' 05:00:00'
    let query = 'getDataWeb'
    let obj = {'id': id, "start": init, "end": end, "tags": tags}
    this.api.putQuery(query, obj).subscribe((response: any) => {
      if(response.length >0){
        if (response != null) {
          let temp: any[] = []
          let temp3: any[] = []
          let temp5: any[] = []
          for (let i of response) {
            if (!temp.includes(i.type)) {
              temp.push(i.type)
            }
          }
          for (let i of temp) {
            temp3 = []
            for (let x of response) {
              if (i == x.type) {
                temp3.push({y: x.data, x: new Date(x.sensedAt + 'Z').toLocaleString()})
              }
            }
            let color = this.getRandomColor()
            temp5.push({
              data: temp3,
              label: i,
              borderColor: color,
              backgroundColor: color,
              pointBackgroundColor: color,
              display: false,
              pointBorderColort: color
            })
          }
          // if(id == '648ca98972114d2f0457ebbf'){
          //   this.s1 = {datasets: temp5, labels: []}
          /* }else */
          if (id == '648ca97e72114d2f0457ebaf') {
            this.s2 = new Chart('s2', {
              type: 'line',
              data: {datasets: temp5, labels: []},
              options: this.option.options
            });
          } else if (id == '648ca81672114d2f0457eb89') {
            this.s3 = new Chart('s3', {
              type: 'line',
              data: {datasets: temp5, labels: []},
              options: this.option.options
            });

          }/*else if(id == '648ca97f72114d2f0457ebb7'){
          this.s4 = {datasets: temp5, labels: []}
        }else if(id == '648ca96a72114d2f0457eba0'){
          this.s5 = {datasets: temp5, labels: []}
        }*/ else if (id == '64b5cb98cca9b534b74527c0') {
            this.s6 = new Chart('s6', {
              type: 'line',
              data: {datasets: temp5, labels: []},
              options: this.option.options
            });
          } else if (id == '64b5cbfecca9b534b74528ed') {
            this.s7 = new Chart('s7', {
              type: 'line',
              data: {datasets: temp5, labels: []},
              options: this.option.options
            });
          } else if (id == '64b5cc16cca9b534b7452948') {
            this.s8 = new Chart('s8', {
              type: 'line',
              data: {datasets: temp5, labels: []},
              options: this.option.options
            });
          } else if (id == '64b5cc2dcca9b534b7452985') {
            this.s9 = new Chart('s9', {
              type: 'line',
              data: {datasets: temp5, labels: []},
              options: this.option.options
            });
          } else if (id == '64b5cc45cca9b534b74529c2') {
            this.s10 = new Chart('s10', {
              type: 'line',
              data: {datasets: temp5, labels: []},
              options: this.option.options
            });
          }
        }
      }
    });

  }

  // fetchTemp() {
  //   let init = ''
  //   let end = ''
  //   let tags: string[] = ['humedad', 'velocidad', 'temperatura'];
  //   init = moment(new Date()).format("DD/MM/YYYY HH:MM:SS")
  //   end = moment(new Date()).add(1, 'days').format("DD/MM/YYYY") + ' 05:00:00'
  //   let query = 'getDataWeb'
  //   let obj = {'id': '64ac3680dc5442c4e078a0f9', "start": init, "end": end, "tags": tags}
  //   this.api.putQuery(query, obj).subscribe((response: any) => {
  //     response.slice(-3).forEach((item: any) => {
  //       if (item.type === 'temperatura') {
  //         this.temperature = parseFloat(item.data.toFixed(1));
  //       } else if (item.type === 'humedad') {
  //         this.humidity = parseFloat(item.data.toFixed(1));
  //       } else if (item.type === 'velocidad') {
  //         this.velocity = parseFloat(item.data.toFixed(1));
  //       }
  //     });
  //     this.reloadG()
  //   })
  // }

  fetchDataElec(id: any) {
    let init = ''
    let end = ''
    let tags: string[] = ['corriente_A', 'corriente_B', 'corriente_C'];
    init = moment(new Date(new Date().getTime() + 3600 * 5000)).format("DD/MM/YYYY HH:MM:SS")
    end = moment(new Date()).add(1, 'days').format("DD/MM/YYYY") + ' 05:00:00'
    let query = 'getDataWeb'
    let obj = {'id': id, "start": init, "end": end, "tags": tags}
    this.api.putQuery(query, obj).subscribe((response: any) => {
      if(response.length >0) {
        if (response != null) {
          let temp: any[] = []
          let temp3: any[] = []
          let temp5: any[] = []
          for (let i of response) {
            if (!temp.includes(i.type)) {
              temp.push(i.type)
            }
          }
          for (let i of temp) {
            temp3 = []
            for (let x of response) {
              if (i == x.type) {
                temp3.push({y: x.data, x: new Date(x.sensedAt + 'Z').toLocaleString()})
              }
            }
            let color = this.getRandomColor()
            temp5.push({
              data: temp3,
              label: i,
              borderColor: color,
              backgroundColor: color,
              pointBackgroundColor: color,
              display: false,
              pointBorderColort: color
            })
          }
          if (id == '64ad81a0dc5442c4e0796382') {
            this.she = new Chart('she', {
              type: 'line',
              data: {datasets: temp5, labels: []},
              options: this.option.options
            });
          } else if (id == '64ac62fcdc5442c4e078bb14') {
            this.acu = new Chart('acu', {
              type: 'line',
              data: {datasets: temp5, labels: []},
              options: this.option.options
            });
          }
        }
      }
    });

  }

  private repeat() {
    interval(10000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getLastest();
      });
  }

  private getLastest() {
    this.fetchLastDataS31()
    this.fetchLastDataElec()
    this.fetchLastDataTemp()


  }

  reloadG() {
    this.optionsSpeed = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          min: 0,
          max: 2,
          detail: {
            formatter: '{value}'
          },
          data: [
            {
              value: this.velocity,
              name: 'm/sec'
            }
          ]
        }
      ]
    };
    this.optionsHum = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 240,
          splitNumber: 12,
          itemStyle: {
            color: '#58D9F9',
            shadowColor: 'rgba(0,138,255,0.45)',
            shadowBlur: 10,
            shadowOffsetX: 2,
            shadowOffsetY: 2
          },
          progress: {
            show: true,
            roundCap: true,
            width: 18
          },
          pointer: {
            icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
            length: '75%',
            width: 16,
            offsetCenter: [0, '5%']
          },
          axisLine: {
            roundCap: true,
            lineStyle: {
              width: 18
            }
          },
          axisTick: {
            splitNumber: 2,
            lineStyle: {
              width: 2,
              color: '#999'
            }
          },
          splitLine: {
            length: 12,
            lineStyle: {
              width: 3,
              color: '#999'
            }
          },
          axisLabel: {
            distance: 20,
            color: '#999',
            fontSize: 10
          },
          title: {
            show: false
          },
          detail: {
            backgroundColor: '#fff',
            borderColor: '#999',
            borderWidth: 2,
            width: '60%',
            lineHeight: 40,
            height: 40,
            borderRadius: 8,
            offsetCenter: [0, '35%'],
            valueAnimation: true,
            formatter: function (value) {
              return '{value|' + value.toFixed(1) + '}{unit|%RH}';
            },
            rich: {
              value: {
                fontSize: 24,
                fontWeight: 'bolder',
                color: '#777'
              },
              unit: {
                fontSize: 10,
                color: '#999',
                padding: [0, 0, -5, 10]
              }
            }
          },
          data: [
            {
              value: this.humidity
            }
          ]
        }
      ]
    };
    this.optionsTemp = {
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
            color: '#FFAB91'
          },
          progress: {
            show: true,
            width: 30
          },

          pointer: {
            show: false
          },
          axisLine: {
            lineStyle: {
              width: 30
            }
          },
          axisTick: {
            distance: -45,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              color: '#999'
            }
          },
          splitLine: {
            distance: -52,
            length: 14,
            lineStyle: {
              width: 3,
              color: '#999'
            }
          },
          axisLabel: {
            distance: -10,
            color: '#999',
            fontSize: 14
          },
          anchor: {
            show: false
          },
          title: {
            show: false
          },
          detail: {
            valueAnimation: true,
            width: '60%',
            lineHeight: 40,
            borderRadius: 8,
            offsetCenter: [0, '-15%'],
            fontSize: 30,
            fontWeight: 'bolder',
            formatter: '{value} °C',
            color: 'inherit'
          },
          data: [
            {
              value: this.temperature
            }
          ]
        },
      ]
    }
  }

  getRandomColor() {
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
  fetchLastDataS31(){
    let query = 'getLastData'
    for(let id of this.s31s){
      let obj = {'id': id, "tags":['Power']}
      this.api.putQuery(query, obj).subscribe((resp : any) =>{
        // if(id == '648ca98972114d2f0457ebbf'){
        //   this.s1 = {datasets: temp5, labels: []}
        /* }else */
        if (id == '648ca97e72114d2f0457ebaf') {
          if(this.s2!=null){
            this.s2.data.datasets[0].data.push({y:resp[0].data, x:new Date(resp[0].sensedAt + 'Z').toLocaleString()})
            this.s2.data.datasets[0].data.shift()
            this.s2.update()
            this.s2.update()
          }else{
            this.fetchDataS31('648ca97e72114d2f0457ebaf')
          }
        } else if (id == '648ca81672114d2f0457eb89') {
          if(this.s3!=null) {
            this.s3.data.datasets[0].data.push({y: resp[0].data, x: new Date(resp[0].sensedAt + 'Z').toLocaleString()})
            this.s3.data.datasets[0].data.shift()

            this.s3.update()
            this.s3.update()
          }else{
            this.fetchDataS31('648ca81672114d2f0457eb89')
          }
        }/*else if(id == '648ca97f72114d2f0457ebb7'){
          this.s4 = {datasets: temp5, labels: []}
        }else if(id == '648ca96a72114d2f0457eba0'){
          this.s5 = {datasets: temp5, labels: []}
        }*/ else if (id == '64b5cb98cca9b534b74527c0') {
          if(this.s6!=null) {
            this.s6.data.datasets[0].data.push({y: resp[0].data, x: new Date(resp[0].sensedAt + 'Z').toLocaleString()})
            this.s6.data.datasets[0].data.shift()
            this.s6.update()
            this.s6.update()
          }else{
            this.fetchDataS31('64b5cb98cca9b534b74527c0')
          }
        } else if (id == '64b5cbfecca9b534b74528ed') {
          if(this.s7!=null) {
            this.s7.data.datasets[0].data.push({y: resp[0].data, x: new Date(resp[0].sensedAt + 'Z').toLocaleString()});
            this.s7.data.datasets[0].data.shift()

            this.s7.update()
            this.s7.update()
          }else{
            this.fetchDataS31('64b5cbfecca9b534b74528ed')
          }
        } else if (id == '64b5cc16cca9b534b7452948') {
          if(this.s7!=null) {
            this.s8.data.datasets[0].data.push({y: resp[0].data, x: new Date(resp[0].sensedAt + 'Z').toLocaleString()})
            this.s8.data.datasets[0].data.shift()

            this.s8.update()
            this.s8.update()
          }else{
            this.fetchDataS31('64b5cc16cca9b534b7452948')
          }
        } else if (id == '64b5cc2dcca9b534b7452985') {
          if(this.s9!=null) {
            this.s9.data.datasets[0].data.push({y: resp[0].data, x: new Date(resp[0].sensedAt + 'Z').toLocaleString()})
            this.s9.data.datasets[0].data.shift()
            this.s9.update()
            this.s9.update()
          }else{
            this.fetchDataS31('64b5cc2dcca9b534b7452985')
          }
        } else if (id == '64b5cc45cca9b534b74529c2') {
          if(this.s10!=null) {
            this.s10.data.datasets[0].data.push({y: resp[0].data, x: new Date(resp[0].sensedAt + 'Z').toLocaleString()})
            this.s10.data.datasets[0].data.shift()
            this.s10.update()
            this.s10.update()
          }else{
            this.fetchDataS31('64b5cc45cca9b534b74529c2')
          }
        }});
    }
  }
  fetchLastDataElec(){
    let query = 'getLastData'
    for(let id of this.elec){
      let obj = {'id': id, "tags":['corriente_A','corriente_B', "corriente_C"]}
      this.api.putQuery(query, obj).subscribe((resp : any) =>{
        for(let tags of resp){
          if (id == '64ad81a0dc5442c4e0796382') {
            if(this.she!=null) {
              for (let n in this.she.data.datasets) {
                if (tags.type == this.she.data.datasets[n].label) {
                  this.she.data.datasets[n].data.push({
                    y: tags.data,
                    x: new Date(tags.sensedAt + 'Z').toLocaleString()
                  })
                  this.she.data.datasets[n].data.shift()
                }
              }
            }else{
              this.fetchDataElec('64ad81a0dc5442c4e0796382')
            }
            // this.she.data.datasets[0].data.push({y:resp[0].data, x:new Date(resp[0].sensedAt + 'Z').toLocaleString()})
          } else if (id == '64ac62fcdc5442c4e078bb14') {
            if(this.acu!=null) {
              for (let n in this.she.data.datasets) {
                if (tags.type == this.she.data.datasets[n].label) {
                  this.acu.data.datasets[n].data.push({
                    y: tags.data,
                    x: new Date(tags.sensedAt + 'Z').toLocaleString()
                  })
                  this.acu.data.datasets[n].data.shift()
                }
              }
            }else{
              this.fetchDataElec('64ac62fcdc5442c4e078bb14')


            }

            // this.acu.data.datasets[0].data.push({y:resp[0].data, x:new Date(resp[0].sensedAt + 'Z').toLocaleString()})
          }
        }
        this.she.update()
        this.she.update()
        this.acu.update()
        this.acu.update()

      });

    }
  }
  fetchLastDataTemp(){
    let query = 'getLastData'
    let obj = {'id': '64ac3680dc5442c4e078a0f9', "tags":['humedad', 'velocidad', 'temperatura']}
    this.api.putQuery(query, obj).subscribe((response: any) => {
      response.forEach((item: any) => {
        if (item.type === 'temperatura') {
          this.temperature = parseFloat(item.data.toFixed(1));
        } else if (item.type === 'humedad') {
          this.humidity = parseFloat(item.data.toFixed(1));
        } else if (item.type === 'velocidad') {
          this.velocity = parseFloat(item.data.toFixed(1));
        }
      });
      this.reloadG()
  });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
