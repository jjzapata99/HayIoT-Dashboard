import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiConectionService} from "../../services/api/api-conection.service";
import {IconSetService} from "@coreui/icons-angular";
import {
  brandSet,
  cilBrush,
  cilCheck,
  cilListNumbered,
  cilPaperPlane,
  cilSearch,
  cilStar,
  cilX,
  cilFile,
  cilMenu,
  cilPencil,
  cilSpeedometer,
  cilFindInPage,
  cilRouter,
  cilRss
} from "@coreui/icons";
import {DashboardChartsData} from "../dashboard/dashboard-charts-data";
import {interval, Subject, takeUntil} from "rxjs";
import * as moment from "moment";
import {Chart, ScatterDataPoint} from "chart.js";
import {ECharts, EChartsOption, getInstanceByDom} from "echarts";

@Component({
  selector: 'app-lrd',
  templateUrl: './lrd.component.html',
  styleUrls: ['./lrd.component.scss']
})
export class LrdComponent  implements  OnInit, OnDestroy{
  chart: any;
  option: any;
  badSensors : any[]=[];
  names = [['G1S1', 'G1S2'],['G2S1', 'G2S2'],['G3S1*', 'G3S2'], ['G4S1', 'G4S2'], ['G5S1', 'G5S2'], ['G6S1', 'G6S2'], ['G7S1', '']]
  senso = [['6570c84b2a193755863ac313', '6571f6df63f2324314ccab35'], ['6571f9f478bbe54d089a7ab0', '6571fcaed6802c0e4eea6a5a'], ['658495712716d78b0d60bcba', '6571ffac32f7b71ba5318f57'] ,['657895323df99ac8ec108c92', '65789cc1b5e8c47d6635f140'], ['65789e52b5e8c47d6635f837','6578a00d6801548863072886'], ['659c8a2456b42d5fab7b9bcb', '659c8a5dd5525e744625a749'], ['659c8a6d56b42d5fab7b9d7a', '']]
  sensors = ['6570c84b2a193755863ac313', '6571f6df63f2324314ccab35', '6571f9f478bbe54d089a7ab0','6571fcaed6802c0e4eea6a5a', '658495712716d78b0d60bcba', '6571ffac32f7b71ba5318f57', '657895323df99ac8ec108c92', '65789cc1b5e8c47d6635f140','65789e52b5e8c47d6635f837', '6578a00d6801548863072886', '659c8a2456b42d5fab7b9bcb', '659c8a2456b42d5fab7b9bcb', '659c8a5dd5525e744625a749', '659c8a6d56b42d5fab7b9d7a', '']
  echarts: any[] = []
  temperature = 10
  humed = 1
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
          fontSize: 15
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
          fontSize: 25,
          fontWeight: 'bolder',
          formatter: '{value} °C',
          color: 'inherit'
        },
        data: [
          {
            value: 0
          }
        ]
      },
    ]
  }
  optionsHum: EChartsOption = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        min: 0,
        max: 80,
        axisLabel:{
          fontSize:10
        },
        detail: {
          valueAnimation: true,
          fontSize: 15,
          formatter: '{value}',
        },
        data: [
          {
            value: 0,
            name: 'RH'
          }
        ]

      }
    ]
  };


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
      cilFindInPage,
      cilSpeedometer, cilRouter, cilRss, ...brandSet
    };
  }
  private destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.repeat();
    for (let i of this.sensors){
      this.fetchData(i)
    }

  }

  private repeat() {
    interval(120000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getLastest();
      });
  }

  private getLastest() {
    for(let id of this.sensors){
      this.fetchLastData(id)
    }

  }
  fetchData(id: any) {
    let init = ''
    let end = ''
    let tags: string[] = ['humidity', 'temp'];
    init = moment(new Date(new Date().getTime() + 3600 * 4500)).format("DD/MM/YYYY HH:mm:00")
    end = moment(new Date()).add(1, 'days').format("DD/MM/YYYY") + ' 05:00:00'
    let query = 'getDataWeb'
    let obj = {'id': id, "start": init, "end": end, "tags": tags}
    this.api.putQuery(query, obj).subscribe((response: any) => {
      console.log(id)
      console.log(response)
      if (response.length >0) {
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
              temp3.push({y: x.data, x: new Date(x.sensedAt).toLocaleString()})
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
        new Chart(id, {
            type: 'line',
            data: {datasets: temp5, labels: []},
            options: this.option.options
        });
        const h =temp5.findIndex( n => n.label === "humidity")
        const t =temp5.findIndex( n => n.label === "temp")
        this.fetchGauge(id, parseFloat((temp5[h].data[temp5[h].data.length-1].y).toFixed(1)), "humidity")
        this.fetchGauge(id, parseFloat((temp5[t].data[temp5[t].data.length-1].y).toFixed(1)), "temp")

      }else{
        this.badSensors.push(id)
      }

    });

  }

  fetchGauge(id: any, last:any, type: any){
    if(type =='humidity'){
      getInstanceByDom(document.getElementById(id.concat('1'))!)?.setOption({
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: 'Pressure',
            type: 'gauge',
            min: 0,
            max: 80,
            axisLabel:{
              fontSize:10
            },
            detail: {
              valueAnimation: true,
              fontSize: 15,
              formatter: '{value}',
            },
            data: [
              {
                value: last,
                name: 'RH'
              }
            ]

          }
        ]
      })
    }
    else{
      getInstanceByDom(document.getElementById(id.concat('2'))!)?.setOption({
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
              fontSize: 15
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
              fontSize: 25,
              fontWeight: 'bolder',
              formatter: '{value} °C',
              color: 'inherit'
            },
            data: [
              {
                value: last
              }
            ]
          },
        ]
      })
    }
  }
  fetchLastData(id: any){
    let query = 'getLastData'
    let obj = {'id': id, "tags":['humidity', 'temp']}
    this.api.putQuery(query, obj).subscribe((response: any) => {
      if(response.length>1){
        let validator :any = Chart.getChart(id)?.data.datasets[0].data
        if(!(validator[validator.length -1].x === new Date(response[0].sensedAt + 'Z').toLocaleString())){

          response.forEach((item: any) => {
            for (let i in Chart.getChart(id)?.data.datasets!) {
              if (Chart.getChart(id)?.data.datasets[i].label == item.type) {
                let n: any = {
                  y: item.data, x: new Date(item.sensedAt + 'Z').toLocaleString()
                }
                Chart.getChart(id)!.data.datasets[i].data.push(n)
                Chart.getChart(id)!.data.datasets[i].data.shift()
                Chart.getChart(id)!.update()
                Chart.getChart(id)!.update()

              }
            }
          });
        }
        const h = response.findIndex((n: any) => n.type === "humidity")
        const t = response.findIndex((n: any) => n.type === "temp")
        this.fetchGauge(id, parseFloat((response[h].data).toFixed(1)), "humidity")
        this.fetchGauge(id, parseFloat((response[t].data).toFixed(1)), "temp")
      }
    });
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
}
