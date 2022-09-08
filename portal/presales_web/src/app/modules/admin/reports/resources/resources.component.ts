/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { AfterViewInit } from '@angular/core';
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  constructor() { }


  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.renderCountriesRequestsByResources();
    this.renderRequestsStatusesByResources();
    this.renderTaskDistribution();
  }

  private renderRequestsStatusesByResources() {
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
        categories: ['Lara', 'Mazen', 'Bahaa', 'Ahmad', 'Elida', 'Georges', 'Mohamad'],
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
      const chart = new ApexCharts(document.querySelector('#chart'), options);
      chart.render();
    }, 400);
  }
  private renderCountriesRequestsByResources() {
    const options = {
      series: [{
        name: 'KSA',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      }, {
        name: 'UAE',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
      }, {
        name: 'EYGPT',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
      }],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Mazen', 'Bahaa', 'Lara', 'Mohamad', 'Georges', 'Elida', 'Jamal', 'Jad', 'Rida'],
      },
      yaxis: {
        title: {
          text: '$ (thousands)'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: val => '$ ' + val + ' thousands'
        }
      }
    };

    setTimeout(() => {
      const chart = new ApexCharts(document.querySelector('#countriesRequestsByResources'), options);
      chart.render();
    }, 400);

  }
  private renderTaskDistribution() {
    const options = {
      series: [{
        name: 'Series 1',
        data: [80, 50, 30, 40, 100, 20],
      }],
      chart: {
        height: 450,
        type: 'radar',
      },
      title: {
        // text: 'Basic Radar Chart'
      },
      xaxis: {
        categories: ['Mazen', 'Bahaa', 'Lara', 'Mohamad', 'Jad', 'Tony']
      }
    };

    setTimeout(() => {
      const chart = new ApexCharts(document.querySelector('#tasksDistribution'), options);
      chart.render();
    }, 400);
  }
}
