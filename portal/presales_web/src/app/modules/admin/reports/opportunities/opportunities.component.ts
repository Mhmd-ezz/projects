/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts';
@Component({
  selector: 'app-opportunities',
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.scss']
})
export class OpportunitiesComponent {

  constructor() { }

  ngAfterViewInit() {
    this.renderCategorizedRequestByCountries();
    this.renderRequestByCountries();
  }

  private renderRequestByCountries() {

    const options = {
      series: [{
        name: 'Won',
        data: [44, 55, 41, 37, 22, 43, 21]
      }, {
        name: 'Lost',
        data: [53, 32, 33, 52, 13, 43, 32]
      }, {
        name: 'Cancelled',
        data: [12, 17, 11, 9, 15, 11, 20]
      }
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      title: {
        text: ''
      },
      xaxis: {
        categories: ['Algeria', 'KSA', 'UAE', 'EYGPT', 'AMMAN', 'LEBANON', 'FRANCE'],
        labels: {
          formatter: val => val + 'K'

        }
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      tooltip: {
        y: {
          formatter: val => val + 'K'

        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      }
    };

    setTimeout(() => {
      const chart = new ApexCharts(document.querySelector('#allRequestsByCountries'), options);
      chart.render();
    }, 400);
  }
  private renderCategorizedRequestByCountries() {
    const options = {
      series: [{
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
      }],
      chart: {
        type: 'bar',
        height: 380
      },
      plotOptions: {
        bar: {
          barHeight: '100%',
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: 'bottom'
          },
        }
      },
      colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
        '#f48024', '#69d2e7'
      ],
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        style: {
          colors: ['#fff']
        },
        formatter: (val, opt) => opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val
        ,
        offsetX: 0,
        dropShadow: {
          enabled: true
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
          'United States', 'China', 'India'
        ],
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      title: {
        // text: 'Requests by countries',
        // align: 'center',
        // floating: true
      },
      // subtitle: {
      //   text: 'Category Names as DataLabels inside bars',
      //   align: 'center',
      // },
      tooltip: {
        theme: 'dark',
        x: {
          show: false
        },
        y: {
          title: {
            formatter: () => ''
          }
        }
      }
    };

    const chart = new ApexCharts(document.querySelector('#categorizedRequestsByCountries'), options);
    chart.render();
  }
}
