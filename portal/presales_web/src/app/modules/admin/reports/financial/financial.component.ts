/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts';
@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.scss']
})
export class FinancialComponent {

  constructor() { }

  ngAfterViewInit(): void {
    this.renderRevenueByTime();
    this.renderRevenueByCountry();
    this.renderExpectedVsActualRevenueByCountry();
  }

  private renderRevenueByTime() {
    const options = {
      series: [{
        name: 'Proposed Amount',
        data: [31, 40, 28, 51, 42, 109, 100]
      }, {
        name: 'Actual Revenue',
        data: [11, 32, 45, 32, 34, 52, 41]
      }],
      chart: {
        // height: 350,
        with: '100%',
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: ['2018-09-19T00:00:00.000Z', '2018-09-19T01:30:00.000Z', '2018-09-19T02:30:00.000Z', '2018-09-19T03:30:00.000Z', '2018-09-19T04:30:00.000Z', '2018-09-19T05:30:00.000Z', '2018-09-19T06:30:00.000Z']
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
    };

    const chart = new ApexCharts(document.querySelector('#revenueByTime'), options);
    chart.render();
  }

  private renderRevenueByCountry() {
    const options = {
      series: [
      {
        data: [
          {
            x: 'Egypt',
            y: 218
          },
          {
            x: 'KSA',
            y: 149
          },
          {
            x: 'USA',
            y: 184
          },
          {
            x: 'UAE',
            y: 55
          },
          {
            x: 'Qatar',
            y: 84
          },
          {
            x: 'Lebanon',
            y: 31
          },
          {
            x: 'France',
            y: 70
          },
          {
            x: 'Canada',
            y: 30
          },
          {
            x: 'Algeria',
            y: 44
          },
          {
            x: 'Kuwait',
            y: 68
          },
          {
            x: 'Oman',
            y: 28
          },
          {
            x: 'Spain',
            y: 19
          },
          {
            x: 'Nigeria',
            y: 29
          }
        ]
      }
    ],
      legend: {
      show: false
    },
    chart: {
      height: 350,
      type: 'treemap'
    },
    title: {
      // text: 'Basic Treemap'
    }
    };

    const chart = new ApexCharts(document.querySelector('#revenueByCountry'), options);
    chart.render();
  }

  private renderExpectedVsActualRevenueByCountry(){
    const options = {
      series: [
      {
        name: 'Actual',
        data: [
          {
            x: 'Qatar',
            y: 1292,
            goals: [
              {
                name: 'Expected',
                value: 1400,
                strokeHeight: 5,
                strokeColor: '#775DD0'
              }
            ]
          },
          {
            x: 'UAE',
            y: 4432,
            goals: [
              {
                name: 'Expected',
                value: 5400,
                strokeHeight: 5,
                strokeColor: '#775DD0'
              }
            ]
          },
          {
            x: 'KSA',
            y: 5423,
            goals: [
              {
                name: 'Expected',
                value: 5200,
                strokeHeight: 5,
                strokeColor: '#775DD0'
              }
            ]
          },
          {
            x: 'Egypt',
            y: 6653,
            goals: [
              {
                name: 'Expected',
                value: 6500,
                strokeHeight: 5,
                strokeColor: '#775DD0'
              }
            ]
          },
          {
            x: 'Lebanon',
            y: 8133,
            goals: [
              {
                name: 'Expected',
                value: 6600,
                strokeHeight: 5,
                strokeColor: '#775DD0'
              }
            ]
          },
          {
            x: 'France',
            y: 7132,
            goals: [
              {
                name: 'Expected',
                value: 7500,
                strokeHeight: 5,
                strokeColor: '#775DD0'
              }
            ]
          },
          {
            x: 'Spain',
            y: 7332,
            goals: [
              {
                name: 'Expected',
                value: 8700,
                strokeHeight: 5,
                strokeColor: '#775DD0'
              }
            ]
          },
          {
            x: 'Oman',
            y: 6553,
            goals: [
              {
                name: 'Expected',
                value: 7300,
                strokeHeight: 5,
                strokeColor: '#775DD0'
              }
            ]
          },
          {
            x: 'USA',
            y: 6553,
            goals: [
              {
                name: 'Expected',
                value: 4333,
                strokeHeight: 5,
                strokeColor: '#775DD0'
              }
            ]
          },
          {
            x: 'Algeria',
            y: 6553,
            goals: [
              {
                name: 'Expected',
                value: 7300,
                strokeHeight: 5,
                strokeColor: '#775DD0'
              }
            ]
          },
          {
            x: 'Ghana',
            y: 5000,
            goals: [
              {
                name: 'Expected',
                value: 6000,
                strokeHeight: 5,
                strokeColor: '#775DD0'
              }
            ]
          },
          {
            x: 'Iraq',
            y: 8000,
            goals: [
              {
                name: 'Expected',
                value: 4000,
                strokeHeight: 5,
                strokeColor: '#775DD0'
              }
            ]
          },
          {
            x: 'Mali',
            y: 2000,
            goals: [
              {
                name: 'Expected',
                value: 3500,
                strokeHeight: 5,
                strokeColor: '#775DD0'
              }
            ]
          }
        ]
      }
    ],
      chart: {
      height: 350,
      type: 'bar'
    },
    plotOptions: {
      bar: {
        columnWidth: '60%'
      }
    },
    colors: ['#00E396'],
    dataLabels: {
      enabled: false
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['Actual', 'Expected'],
      markers: {
        fillColors: ['#00E396', '#775DD0']
      }
    }
    };

    const chart = new ApexCharts(document.querySelector('#expectedVsActualRevenueByCountry'), options);
    chart.render();
  }
}
